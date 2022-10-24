import { API, TOKEN_KEY } from "../../constants";

function PublicHome() {
  const authUrl = `${API.BASE}/authorize`;

  return (
    <div className="mx-auto md:mx-12 w-full h-full flex ">
      <div className="w-1/3 h-full font-bold mt-30 ml-20">
        <p className="text-blue-900 text-7xl mt-32">WeHuddle</p>
        <p className="font-normal text-gray-500 text-lg mt-5">
          lorem ipsum ah jlsao hdsal hdaskd lajds al dsk daskd askdjsad sadlsajd
          sajdlsajd hkdsa daksjd kda sdk sadkjs djsakd akjsdkas jd
        </p>
      </div>
      <div className="w-2/3 h-full -mr-10">
        <img className="w-9/12" src="/9814.jpg" alt="" />
      </div>
    </div>
  );
}

export default PublicHome;
