import React from 'react';
import Button from './Button';

const SongCreationStepOne = ({
  songCreationData,
  handleSongCreationInputChange,
  handleStepOneSubmit,
}) => {
  const stepTwoInputs = [
    {
      id: 1,
      name: 'toName',
      label: 'To (who will receive this song?):',
      type: 'text',
      placeholder: 'Their First Name',
    },
    {
      id: 2,
      name: 'fromName',
      label: 'from (who is making this song?):',
      type: 'text',
      placeholder: 'Your First Name',
    },
    {
      id: 3,
      name: 'relation',
      type: 'select',
      options: [
        {
          id: 1,
          value: 'husband',
          label: `I am their husband`,
        },
        {
          id: 2,
          value: 'wife',
          label: `I am their wife`,
        },
        {
          id: 3,
          value: 'boyfriend',
          label: `I am their boyfriend`,
        },
        {
          id: 4,
          value: 'girlfriend',
          label: `I am their girlfriend`,
        },
        {
          id: 5,
          value: 'friend',
          label: `I am their friend`,
        },
        {
          id: 6,
          value: 'colleague',
          label: `I am their colleague`,
        },
        {
          id: 7,
          value: 'parent',
          label: `I am their parent`,
        },
        {
          id: 8,
          value: 'child',
          label: `I am their child`,
        },
        {
          id: 9,
          value: 'grandchild',
          label: `I am their grandchild`,
        },
      ],
    },
  ];
  return (
    <form
      className="poppinsFont mx-auto mt-8 max-w-xl"
      onSubmit={handleStepOneSubmit}
    >
      <div className="flex flex-col gap-3">
        {stepTwoInputs.map((input) => {
          return (
            <React.Fragment key={input.id}>
              {input.type === 'select' ? (
                <select
                  className={`w-full rounded border-none shadow-inner ${
                    songCreationData.relation === '' && 'text-lightGray'
                  }`}
                  name={input.name}
                  value={songCreationData[input.name]}
                  onChange={handleSongCreationInputChange}
                >
                  <option
                    value=""
                    disabled
                  >
                    Relationship
                  </option>
                  {input.options.map((option) => (
                    <option
                      className="text-black"
                      key={option.id}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="first:mb-3">
                  <label
                    className="instructionsFont mb-2 text-xs uppercase text-lightYellow"
                    htmlFor={input.name}
                  >
                    {input.label}
                  </label>
                  <input
                    className="block w-full rounded border-none shadow-inner placeholder:text-sm placeholder:text-lightGray"
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    value={songCreationData[input.name]}
                    onChange={handleSongCreationInputChange}
                    placeholder={input.placeholder}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button
          type="submit"
          label="next"
        />
      </div>
    </form>
  );
};

export default SongCreationStepOne;
