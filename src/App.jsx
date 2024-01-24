import { useEffect, useState } from 'react';
import {
  WelcomeBackScreen,
  LoadingScreen,
  LyricsScreen,
  VideoScreen,
  Backdrop,
  Notify,
  PopupScreen,
  ExceededPopup,
  LandscapeScreen,
  RegistrationCard,
  NavBar,
  SplashScreen,
  SongCreationCard,
} from './components/index.js';
import { apiRequest } from './utils/apiRequest';
import {
  abusiveWordChecker,
  songCreationStepTwoValidation,
  validateEmail,
  validateFirstName,
  validateName,
  validatePhoneNumber,
} from './utils/inputValidation.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  isMobile,
  isBrowser,
  browserName,
  osName,
  isIOS,
} from 'react-device-detect';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { externalLinks } from './constants/externalLinks.js';

function App() {
  //UTM params Detection-------------------------------------------------------------------
  const location = useLocation();
  const currentURL = location.search;
  const urlParams = new URLSearchParams(currentURL);
  //All States--------------------------------------------------------------------------------
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [videoURL, setVideoURL] = useState('');
  const [userData, setUserData] = useState({
    salutation: 'mr',
    name: '',
    email: '',
    mobile: '',
    dob: null,
    terms: false,
    privacy: false,
    activation: false,
    promo: false,
    latitude: null,
    longitude: null,
  });
  const [songCreationData, setSongCreationData] = useState({
    whatMakesUnique: '',
    favThing: '',
    loveReason: '',
    toName: '',
    fromName: '',
    relation: '',
  });
  const [apiResponses, setApiResponses] = useState({
    uid: '',
    sid: '',
    token: '',
  });
  const [deviceDetails, setDeviceDetails] = useState({
    device: '',
    os: '',
    browser: '',
  });
  const [songCreationStep, setSongCreationStep] = useState(1);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('splash');
  const [userName, setUserName] = useState('');
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState('');
  const [cid, setCid] = useState('');
  const [hutk, setHutk] = useState('');
  const [utmParams, setUtmParams] = useState({
    utm_campaign: '',
    utm_content: '',
    utm_medium: '',
    utm_src: '',
    utm_term: '',
  });
  const [showPopupScreen, setShowPopupScreen] = useState(false);
  const [popupPage, setPopupPage] = useState('');
  const [showExceededPopup, setShowExceededPopup] = useState(false);
  const [showVocalAgainBtn, setShowVocalAgainBtn] = useState(false);
  //useEffect-----------------------------------------------------------------------------------
  useEffect(() => {
    hitLogAPIFunction();
    const uid = localStorage.getItem('uid');
    const userName = localStorage.getItem('userName');
    const splashScreenTimer = setTimeout(() => {
      if (uid && userName) {
        setUserName(JSON.parse(userName));
        setApiResponses((prevRes) => ({ ...prevRes, uid: JSON.parse(uid) }));
        setCurrentComponent('welcomeBack');
      } else {
        setCurrentComponent('register');
      }
    }, 3000);
    const hutkData = getData('hubspotutk');
    if (hutkData === '' || undefined) {
      setHutk('');
    } else {
      setHutk(hutkData);
    }
    const cidData = getGoogleCID();
    if (cidData === '' || undefined) {
      setCid('');
    } else {
      setCid(cidData);
    }
    setUtmParams({
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_src: urlParams.get('utm_source') || '',
      utm_term: urlParams.get('utm_term') || '',
    });
    return () => clearTimeout(splashScreenTimer);
  }, []);
  //Env variables-------------------------------------------------------------------------------
  const apiKey = import.meta.env.VITE_API_KEY;
  const hitLogURL = `${import.meta.env.VITE_API_URL}/add-hit-log`;
  const registerURL = `${import.meta.env.VITE_API_URL}/register`;
  const generateLyricsURL = `${import.meta.env.VITE_API_URL}/generate-lyrics`;
  const addVideoRequestURL = `${
    import.meta.env.VITE_API_URL
  }/add-video-request`;
  const getVideoURL = `${import.meta.env.VITE_API_URL}/get-video`;
  const setFlagApiURL = `${import.meta.env.VITE_API_URL}/set-flag`;
  const checkSongsURL = `${import.meta.env.VITE_API_URL}/check-songs`;
  //Device, OS & Browser Detection---------------------------------------------------------
  const detectDevice = () => {
    const device = isMobile ? 'Mobile' : isBrowser ? 'Desktop' : 'Unknown';
    const os = osName;
    const browser = browserName;
    return { device, os, browser };
  };
  const hitLogAPIFunction = async () => {
    const { device, os, browser } = detectDevice();
    const hitLogAPIBody = {
      apikey: apiKey,
      device: device,
      os: os,
      browser: browser,
    };
    try {
      await apiRequest(hitLogURL, hitLogAPIBody);
      setDeviceDetails({ device: device, os: os, browser: browser });
    } catch (error) {
      console.log('hitLogApiError:', error);
    }
  };
  //CID & HUTK------------------------------------------------------------------------------
  function getGoogleCID() {
    return getData('_ga').split('.')[2] + '.' + getData('_ga').split('.')[3];
  }
  function getData(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  //Registration Logic---------------------------------------------------------------------
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };
  const {
    salutation,
    name,
    email,
    mobile,
    dob,
    terms,
    privacy,
    activation,
    promo,
  } = userData;
  const handleRegistrationFormSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length > 40) {
      return toast(<Notify notifyText="Name exceeding limit max: 40 char" />);
    }
    if (!validateName(name.trim())) {
      return toast(<Notify notifyText="Enter a valid name" />);
    }
    if (!validateEmail(email.trim())) {
      return toast(<Notify notifyText="Enter a valid Email" />);
    }
    if (!validatePhoneNumber(mobile.trim())) {
      return toast(<Notify notifyText="Enter a valid Phone Number" />);
    }
    if (dob === null) {
      return toast(<Notify notifyText="Select your birth date" />);
    }
    if (!terms) {
      return toast(<Notify notifyText="Accept the terms and conditions" />);
    }
    if (!privacy) {
      return toast(<Notify notifyText="Accept the data privacy policy" />);
    }
    if (!activation) {
      return toast(<Notify notifyText="Accept the activation mechanics" />);
    }
    const formattedDate = format(dob, 'yyyy-MM-dd');
    setIsButtonLoading(true);
    let timeoutExpired = false;
    let locationTimeout;
    const registrationApiBody = {
      apikey: apiKey,
      salutation: salutation,
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      dob: formattedDate,
      terms: terms,
      privacy: privacy,
      activation: activation,
      promo: promo,
      device: deviceDetails.device,
      os: deviceDetails.os,
      browser: deviceDetails.browser,
      cid: cid,
      hutk: hutk,
      utm_camp: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_medium: utmParams.utm_medium,
      utm_src: utmParams.utm_src,
      utm_term: utmParams.utm_term,
      latitude: '',
      longitude: '',
    };
    const callRegistrationAPI = async (registrationApiBody) => {
      try {
        const data = await apiRequest(registerURL, registrationApiBody);
        if (!data.success) {
          throw new Error('Registration failed');
        }
        //DL for fpd
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'proceed_fpdpage',
        });
        const uid = data.uid;
        const nameArray = name.split(' ');
        const firstName = nameArray[0];
        localStorage.setItem('uid', JSON.stringify(uid));
        localStorage.setItem('userName', JSON.stringify(firstName));
        setApiResponses((prevRes) => ({ ...prevRes, uid: uid }));
        setSongCreationData((prevData) => ({
          ...prevData,
          fromName: firstName,
        }));
        if (data.flgSong) {
          setCurrentComponent('createSong');
        } else {
          setShowExceededPopup(true);
        }
      } catch (error) {
        toast(<Notify notifyText="Error occurred! Please try again" />);
        console.log(error);
      } finally {
        setIsButtonLoading(false);
      }
    };

    const updateAndLogData = async (latitude, longitude) => {
      const updatedRegistrationApiBody = {
        ...registrationApiBody,
        latitude,
        longitude,
      };
      await callRegistrationAPI(updatedRegistrationApiBody);
    };

    const handleLocationSuccess = (position) => {
      if (timeoutExpired) return;
      clearTimeout(locationTimeout);
      updateAndLogData(position.coords.latitude, position.coords.longitude);
    };

    const handleLocationError = () => {
      if (timeoutExpired) return;
      clearTimeout(locationTimeout);
      updateAndLogData('', '');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
      );

      locationTimeout = setTimeout(() => {
        timeoutExpired = true;
        updateAndLogData('', '');
      }, 10000);
    } else {
      handleLocationError();
    }
  };
  //Song Creation Logic----------------------------------------------------------------------
  const handleSongCreationInputChange = (e) => {
    setSongCreationData({
      ...songCreationData,
      [e.target.name]: e.target.value,
    });
  };
  const { toName, fromName, relation, whatMakesUnique, favThing, loveReason } =
    songCreationData;
  const handleBack = () => {
    setSongCreationStep(songCreationStep - 1);
  };
  //Handle Step Two Submission----------------------------------------------------------
  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    if (toName.trim() === '' || fromName.trim() === '' || relation === '') {
      return toast(<Notify notifyText="Fill all details to continue" />);
    }
    if (toName.trim().length > 15 || fromName.trim().length > 15) {
      return toast(<Notify notifyText="First name exceeding limit" />);
    }
    if (!validateFirstName(toName.trim())) {
      return toast(<Notify notifyText="Invalid First Name" />);
    }
    if (!validateFirstName(fromName.trim())) {
      return toast(<Notify notifyText="Invalid First Name" />);
    }
    if (
      abusiveWordChecker(toName.trim()) ||
      abusiveWordChecker(fromName.trim())
    ) {
      return toast(<Notify notifyText="Inappropriate Message" />);
    }
    setSongCreationStep(songCreationStep + 1);
  };
  //Handle Step Two Submission----------------------------------------------------------
  const handleStepTwoSubmit = async (e) => {
    e.preventDefault();
    if (
      whatMakesUnique.trim() === '' ||
      favThing.trim() === '' ||
      loveReason.trim() === ''
    ) {
      return toast(<Notify notifyText="Fill all details to continue" />);
    }
    if (
      abusiveWordChecker(whatMakesUnique.trim()) ||
      abusiveWordChecker(favThing.trim()) ||
      abusiveWordChecker(loveReason.trim())
    ) {
      return toast(<Notify notifyText="Inappropriate Message" />);
    }
    if (
      !songCreationStepTwoValidation(whatMakesUnique.trim()) ||
      !songCreationStepTwoValidation(favThing.trim()) ||
      !songCreationStepTwoValidation(loveReason.trim())
    ) {
      return toast(<Notify notifyText="Invalid input" />);
    }
    if (
      whatMakesUnique.trim().length > 50 ||
      favThing.trim().length > 50 ||
      loveReason.trim().length > 50
    ) {
      return toast(<Notify notifyText="Exceeding input limit max: 50 char" />);
    }
    const generateLyricsApiBody = {
      apikey: apiKey,
      uid: apiResponses.uid,
      toName: toName.trim(),
      fromName: fromName.trim(),
      relation: relation,
      whatMakesUnique: whatMakesUnique.trim(),
      favThing: favThing.trim(),
      loveReason: loveReason.trim(),
    };
    let isLyricsGenerated = false;
    setIsLoadingScreen(true);
    setLoadingTitle('The Cupids are Writing Lyrics');
    const updateLoadingProgress = () => {
      setLoadingProgress((prevProgress) => {
        if (isLyricsGenerated) {
          clearInterval(loadingInterval);
          if (isLyricsGenerated) {
            setIsLoadingScreen(false);
            setCurrentComponent('lyrics');
            setLoadingProgress(0);
          }
          return 100;
        }
        return Math.min(prevProgress + 1, 90);
      });
    };
    const loadingInterval = setInterval(updateLoadingProgress, 100);
    const generateLyricsAPI = async () => {
      try {
        const data = await apiRequest(generateLyricsURL, generateLyricsApiBody);
        if (data.success) {
          const lyrics = data.lyrics;
          setLyrics(lyrics);
          const sid = data.sid;
          setApiResponses((prevRes) => ({ ...prevRes, sid: sid }));
          isLyricsGenerated = true;
        } else {
          if (data.message === 'ERROR: SONG QUOTA EXCEEDED') {
            toast(<Notify notifyText="Error: Song Quota Exceeded" />);
          } else {
            toast(<Notify notifyText="An error occurred. Please try again." />);
            setIsLoadingScreen(false);
          }
        }
      } catch (error) {
        console.log('Error at generating lyrics', error);
        toast(<Notify notifyText="Error ocurred! Please try again" />);
      }
    };
    await generateLyricsAPI();
  };
  //Lyrics Page---------------------------------------------------------------------------------
  const handleReVocalize = () => {
    setIsLoadingScreen(false);
    setCurrentComponent('lyrics');
    setLoadingProgress(0);
    setShowVocalAgainBtn(false);
  };

  const handleLyricsSubmit = async (e) => {
    e.preventDefault();
    let isVideoGenerated = false;
    let maxRecallLimit = 14;
    let recallApi = 0;
    setIsLoadingScreen(true);
    const updateLoadingProgress = () => {
      setLoadingProgress((prevProgress) => {
        if (isVideoGenerated) {
          clearInterval(loadingInterval);
          if (isVideoGenerated) {
            setIsLoadingScreen(false);
            setCurrentComponent('videoScreen');
            //DL for video screen
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: 'outputpage',
            });
            setLoadingProgress(0);
          }
          return 100;
        }
        return Math.min(prevProgress + 1, 90);
      });
    };
    const loadingInterval = setInterval(updateLoadingProgress, 1000);
    setLoadingTitle('The Cupids are vocalizing!');
    const addVideoRequestData = {
      apikey: apiKey,
      uid: apiResponses.uid,
      sid: apiResponses.sid,
    };
    const tokenRetriever = async () => {
      try {
        const data = await apiRequest(addVideoRequestURL, addVideoRequestData);
        if (data.success) {
          //DL Lyrics submitted
          window.dataLayer = window.dataLayer || [];
          dataLayer.push({
            event: 'proceed_inputpage',
          });
          const token = data.token;
          setApiResponses((prevRes) => ({ ...prevRes, token: token }));
          return token;
        }
      } catch (error) {
        toast(<Notify notifyText="Error occurred! Please try again" />);
        setIsLoadingScreen(false);
        setLoadingProgress(0);
      }
    };
    const getVideoFunction = async (token) => {
      const getVideoApiBody = {
        apikey: apiKey,
        uid: apiResponses.uid,
        sid: apiResponses.sid,
        token: token,
      };
      try {
        const data = await apiRequest(getVideoURL, getVideoApiBody);
        if (data.success) {
          setVideoURL(data.video);
          isVideoGenerated = true;
        }
        if (data.message === 'PENDING' && recallApi <= maxRecallLimit) {
          const getVideoTimeout = setTimeout(
            () => getVideoFunction(token),
            10000,
          );
          recallApi++;
          if (recallApi > maxRecallLimit) {
            setShowVocalAgainBtn(true);
            clearInterval(loadingInterval);
            clearTimeout(getVideoTimeout);
          }
        }
      } catch (error) {
        toast(<Notify notifyText="Error occurred! Please try again" />);
        console.log(error);
      }
    };
    if (!apiResponses.token) {
      const token = await tokenRetriever();
      if (token) {
        await getVideoFunction(token);
      }
    } else {
      const token = apiResponses.token;
      if (token) {
        await getVideoFunction(token);
      }
    }
  };
  //SignIn & SignUp---------------------------------------------------------------------------
  const handleSignIn = async () => {
    try {
      setIsButtonLoading(true);
      const uid = JSON.parse(localStorage.getItem('uid'));
      const data = await apiRequest(checkSongsURL, {
        apikey: apiKey,
        uid,
      });
      if (data.success) {
        const userName = localStorage.getItem('userName');
        setSongCreationData((prevData) => ({
          ...prevData,
          fromName: JSON.parse(userName),
        }));
        setCurrentComponent('createSong');
      } else {
        setShowExceededPopup(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleSignUp = () => {
    localStorage.setItem('uid', '');
    localStorage.setItem('userName', '');
    setUserData({
      salutation: 'mr',
      name: '',
      email: '',
      mobile: '',
      dob: null,
      terms: false,
      privacy: false,
      activation: false,
      promo: false,
    });
    hitLogAPIFunction();
    setCurrentComponent('register');
  };

  const setFlagApiReq = async (type) => {
    const setFlagApiBody = {
      apikey: apiKey,
      uid: apiResponses.uid,
      sid: apiResponses.sid,
      type: type,
    };
    try {
      const data = await apiRequest(setFlagApiURL, setFlagApiBody);
      if (!data.success) {
        throw new Error('Error occurred in setFlagApi');
      }
      return data.success;
    } catch (error) {
      console.log('Error Occurred Hitting setFlagApi:', error);
    }
  };

  const handleDownload = async () => {
    try {
      await setFlagApiReq('download');
      setIsDownloadModalOpen(true);
      const URLfetchResponse = await fetch(videoURL);
      const blob = await URLfetchResponse.blob();
      const downloadableURL = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadableURL;
      a.download = 'Toblerone-Love-Song.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadableURL);
    } catch (error) {
      console.log(error);
    }
  };

  async function generateSharableVideoFile() {
    try {
      const response = await fetch(videoURL);
      const data = await response.blob();
      return new File([data], 'video.mp4', { type: 'video/mp4' });
    } catch (error) {
      console.error(error);
    }
  }

  const handleShare = async () => {
    setIsButtonLoading(true);
    try {
      await setFlagApiReq('share');
      const sharableVideo = await generateSharableVideoFile();
      const shareContent = {
        title: 'Toblerone',
        text: 'A thoughtful toblerone love song',
        url: '',
      };
      if (navigator.canShare) {
        if (navigator.canShare({ files: [sharableVideo] })) {
          const contentToShare = isIOS
            ? { files: [sharableVideo] }
            : { ...shareContent, files: [sharableVideo] };
          await navigator.share(contentToShare);
        } else {
          await navigator.share(shareContent);
        }
      } else {
        toast(<Notify notifyText="Sharing is not supported on your device" />);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleShopee = async () => {
    const res = await setFlagApiReq('shopee');
    if (res) {
      const a = document.createElement('a');
      a.href = externalLinks.shopeeURL;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleLazada = async () => {
    const res = await setFlagApiReq('lazada');
    if (res) {
      const a = document.createElement('a');
      a.href = externalLinks.lazadaURL;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handlePopup = (pName) => {
    setShowPopupScreen(!showPopupScreen);
    setPopupPage(pName);
  };

  const renderComponent = () => {
    if (isLoadingScreen) {
      return (
        <LoadingScreen
          loadingProgress={loadingProgress}
          title={loadingTitle}
          handleReVocalize={handleReVocalize}
          showVocalAgainBtn={showVocalAgainBtn}
        />
      );
    }
    switch (currentComponent) {
      case 'splash':
        return <SplashScreen />;
      case 'welcomeBack':
        return (
          <WelcomeBackScreen
            userName={userName}
            handleSignIn={handleSignIn}
            handleSignUp={handleSignUp}
            isButtonLoading={isButtonLoading}
          />
        );
      case 'register':
        return (
          <RegistrationCard
            userData={userData}
            setUserData={setUserData}
            handleInputChange={handleInputChange}
            handleRegistrationFormSubmit={handleRegistrationFormSubmit}
            isButtonLoading={isButtonLoading}
            handlePopup={handlePopup}
          />
        );
      case 'createSong':
        return (
          <SongCreationCard
            songCreationStep={songCreationStep}
            setSongCreationStep={setSongCreationStep}
            songCreationData={songCreationData}
            setSongCreationData={setSongCreationData}
            handleSongCreationInputChange={handleSongCreationInputChange}
            handleStepOneSubmit={handleStepOneSubmit}
            handleStepTwoSubmit={handleStepTwoSubmit}
            handleBack={handleBack}
          />
        );
      case 'lyrics':
        return (
          <LyricsScreen
            lyrics={lyrics}
            handleLyricsSubmit={handleLyricsSubmit}
            handlePopup={handlePopup}
          />
        );
      case 'videoScreen':
        return (
          <VideoScreen
            videoURL={videoURL}
            isDownloadModalOpen={isDownloadModalOpen}
            setIsDownloadModalOpen={setIsDownloadModalOpen}
            handleDownload={handleDownload}
            handleShare={handleShare}
            handleShopee={handleShopee}
            handleLazada={handleLazada}
            isButtonLoading={isButtonLoading}
            handlePopup={handlePopup}
          />
        );
      default:
        null;
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-start justify-center px-6 py-6 md:py-10">
      {isNavOpen && <Backdrop />}
      <div
        className={`w-full max-w-sm md:max-w-full ${
          currentComponent === 'splash' ||
          currentComponent === 'welcomeBack' ||
          currentComponent === 'videoScreen' ||
          isLoadingScreen
            ? 'self-center'
            : ''
        }`}
      >
        {!isLoadingScreen &&
          (currentComponent === 'register' ||
            currentComponent === 'createSong' ||
            currentComponent === 'lyrics') && (
            <NavBar
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
              handlePopup={handlePopup}
            />
          )}
        {showPopupScreen && (
          <PopupScreen
            popupPage={popupPage}
            handlePopup={handlePopup}
          />
        )}
        {showExceededPopup && (
          <ExceededPopup setShowExceededPopup={setShowExceededPopup} />
        )}
        {renderComponent()}
      </div>
      <LandscapeScreen />
      <ToastContainer
        closeButton={false}
        autoClose={3000}
        toastClassName="bg-transparent m-0 shadow-none"
        position="top-center"
        hideProgressBar={true}
        limit={1}
      />
    </div>
  );
}
export default App;
