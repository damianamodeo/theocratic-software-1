export const Header = ({ headerLeft, title, headerRight }) => {
  return (
    <>
      <div
        className="
h-[11%]
bg-bg
        "
        // border-b(undo)
        // border-bgDark(undo)
        // fixed
        // inset-x-0
        // z-50
        // flex
        // h-navW
        // items-center
        // justify-between
        // p-3
        // dark:bg-bgD
        // md:left-navW
        // "
      >
        <div className="mx-2">{headerLeft}</div>
        <div>{title}</div>
        <div className="mx-2">{headerRight}</div>
      </div>
    </>
  );
};
