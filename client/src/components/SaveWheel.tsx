import Button from "./common/Button";
import InputField from "./common/InputField";
import Modal from "./common/Modal";

const SaveWheel = () => {
  return (
    <Modal
      isOpen={true}
      useDefaultCloseIcon
      showOverlay
      onClose={() => {}}
      className="w-[25%]"
    >
      <div className="mx-6 my-14 mb-8 w-full">
        <div className="text-2xl font-medium leading-normal text-left">
          Modify Title & Description
        </div>
        <InputField placeholder="Enter Wheel Title" label="Title" />
        <InputField placeholder="Enter Wheel Description" label="Description" />
        <div className="mt-8 w-[50%] flex justify-center gap-2 mx-auto">
          <Button type="submit" className="flex-1">
            Save
          </Button>
          <Button invertedVariant type="reset" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveWheel;
