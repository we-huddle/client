function BadgeDetails() {
  const badges = [
    {
      id: 1,
      name: "badge 1",
      level: "1",
      img: "https://sefglobal.org/developers/images/1.png",
    },
    {
      id: 2,
      name: "badge 2",
      level: "2",
      img: "https://sefglobal.org/developers/images/2.png",
    },
    {
      id: 3,
      name: "badge 3",
      level: "3",
      img: "https://sefglobal.org/developers/images/3.png",
    },
    {
      id: 4,
      name: "badge 4",
      level: "4",
      img: "https://sefglobal.org/developers/images/4.png",
    },
    {
      id: 5,
      name: "badge 5",
      level: "5",
      img: "https://sefglobal.org/developers/images/5.png",
    },
  ];
  return (
    <div className="w-full">
      <div className="mx-auto w-11/12 bg-gray-50 p-6 rounded-xl">
        <p className="text-2xl font-semibold text-gray-700">Badges</p>
        <br />
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate. velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate.
        </p>
        <div className="grid grid-cols-4 mt-10 justify-items-center">
          {badges.map((badge) => {
            return (
              <div className="mx-auto content-center place-items-center text-center mb-10">
                <img className="h-24.5 w-24" src={badge.img} alt="" />
                <p className="font-semibold text-lg text-gray-800">
                  {badge.name}
                </p>{" "}
                <p className="bg-gray-300 rounded-md mt-1">
                  Level {badge.level}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
