import { Button } from "../../../../../../common/components/inputs/button";

export const AddCongregation = ({setPage}) => {
  return (
    <>
      <div className="flex flex-col gap-12 text-center mt-12">
        How would you like to add your congregation details?
        <Button action={() => setPage("EnterCongregationDetails")}>
          Enter Manually
        </Button>
        {/* <Button
        action={() => {
          return;
        }}
      >
        Load File
      </Button> */}
      </div>
    </>
  );
};
