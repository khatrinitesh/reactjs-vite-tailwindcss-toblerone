import Heading from './Heading';
import Button from './Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputField = ({ type, name, onChange, value, placeholder }) => {
  return (
    <input
      className="block w-full rounded-lg border-none shadow-inner outline-none placeholder:text-sm placeholder:text-lightGray"
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      autoComplete="on"
    />
  );
};

const CheckboxField = ({
  name,
  label,
  popupText,
  pParams,
  checked,
  onChange,
  handlePopup,
}) => {
  return (
    <div className="flex flex-row-reverse gap-3">
      <label
        className="block text-xs/tight text-whitish"
        htmlFor={name}
      >
        {label}{' '}
        {popupText && (
          <button
            type="button"
            onClick={() => handlePopup(pParams)}
            className="text-lightYellow underline underline-offset-2"
          >
            {popupText}
          </button>
        )}
      </label>
      <input
        className="form-checkbox rounded-sm border-none text-darkPink shadow-inner"
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

function RegistrationCard({
  handleRegistrationFormSubmit,
  handleInputChange,
  userData,
  isButtonLoading,
  setUserData,
  handlePopup,
}) {
  return (
    <section>
      <Heading title="a personalized song inspired by your one-of-a-kind love" />
      <form
        className="poppinsFont mx-auto mt-4 max-w-xl"
        onSubmit={handleRegistrationFormSubmit}
      >
        <h3 className="instructionsFont mx-auto mb-5 max-w-[17rem] text-center text-sm uppercase leading-tight text-lightYellow md:max-w-[25rem]">
          Complete the registration below to download and send to your loved
          one!
        </h3>

        <select
          className="mb-3 w-full rounded-lg border-none shadow-inner"
          name="salutation"
          value={userData.salutation}
          onChange={handleInputChange}
        >
          <option value="mrs">Mrs.</option>
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
          <option value="other">Other</option>
        </select>

        <div className="mb-5 flex flex-col gap-3">
          <InputField
            type="text"
            name="name"
            onChange={handleInputChange}
            value={userData.name}
            placeholder="Enter Name as per National ID Record"
          />
          <InputField
            type="text"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
            placeholder="Enter Email Address"
          />
          <InputField
            type="tel"
            name="mobile"
            onChange={handleInputChange}
            value={userData.phone}
            placeholder="Enter Phone Number (Optional; Ex: 0917xxxxxxx)"
          />

          <DatePicker
            className="w-full rounded-lg border-none shadow-inner placeholder:text-sm placeholder:text-lightGray"
            selected={userData.dob}
            onChange={(date) => setUserData({ ...userData, dob: date })}
            placeholderText="Enter Month and Year of Birth (MM/YYYY)"
            showPopperArrow={false}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            autoComplete="off"
            name="dob"
          />
        </div>

        <div className="flex flex-col items-start gap-2.5 px-4 md:px-0">
          <CheckboxField
            name="terms"
            label="I confirm having read and agreed to the"
            popupText="Terms and Conditions"
            pParams="termsPopup"
            handlePopup={handlePopup}
            checked={userData.terms}
            onChange={handleInputChange}
          />
          <CheckboxField
            name="privacy"
            label="I confirm having read and agreed to the"
            popupText="Data Privacy Policy"
            pParams="privacyPopup"
            handlePopup={handlePopup}
            checked={userData.privacy}
            onChange={handleInputChange}
          />
          <CheckboxField
            name="activation"
            label="I confirm having read and agreed to the"
            popupText="Activation Mechanics"
            pParams="activationPopup"
            handlePopup={handlePopup}
            checked={userData.activation}
            onChange={handleInputChange}
          />
          <CheckboxField
            name="promo"
            label="I would like to receive future news, competitions, and offers from Mondelez international (optional)"
            checked={userData.promo}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Button
            type="submit"
            label="proceed"
            isButtonLoading={isButtonLoading}
          />
        </div>
      </form>
    </section>
  );
}

export default RegistrationCard;
