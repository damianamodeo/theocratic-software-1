import { Button } from "../../../../../common/components/inputs/button";

export const WelcomePage = ({ setPage }) => {
  return (
    <>
      <div className="flex flex-col gap-12 text-center mt-12">
        <div className="text-3xl text-secondary font-bold mt-12">
          Welcome to Orderly
        </div>

        How would you like to add your personal details?
        <Button action={() => setPage("AddPersonalDetails")}>
          Enter Manually
        </Button>
        {/* <Button
          action={() => {
            return;
          }}
        >
          Load  File
        </Button> */}
      </div>
    </>
  );
};
