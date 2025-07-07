import React, { useContext, useEffect, useState } from "react";
import all from "../../assets/img/all.png";
import slot from "../../assets/img/slotL.png";
import casino from "../../assets/img/casinoL.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { GameContext } from "../../contexts/GameContext";
import { AuthContext } from "../../contexts/AuthContext";
import { GameList } from "./GameList";
import ProviderList from "./ProviderList";
import shan from "../../assets/img/shan.jpg";
import ponewine from "../../assets/img/ponewine.jpg";
import styles from "./GameTabsLg.module.css";
import digitBetLogo from "./logo.webp";
import shanLogo from "./Shan/assets/img/shan.jpg";
import TwoDLogo from "../../assets/img/logo.png";

const GameTabsLg = () => {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const provider = searchParams.get("provider");
  const {
    types: gameTabs,
    providersData: providers,
    game_lists: games,
    loading,
    hot_games,
    table_games,
    card_games,
    bingo_games,
  } = useContext(GameContext);
  // const gameProvider = providers && providers.find((p) => p?.code == provider)?.id;

  // const providerUrl = https://luckymillion.pro/api/providers/

  const baseImageMap = {
    1: "/images/Final_All/Slot/SlotPng.png",
    2: "/images/Final_All/Casino/LiveCasinoPNG.png",
    3: "/images/Final_All/Sport Book/SportPNG.png",
    4: "/images/Final_All/Virtual Sport/VirtualSportPNG.png",
    5: "/images/Final_All/Lottery/LotteryPNG.png",
    // 6: "//assets/img/my_local_images/qipai.png",
    7: "/images/Final_All/P2P/P2PPNG.png",
    8: "/images/Final_All/Fishing/FishingPng.png",
    9: "/images/Final_All/Cock Fighting/CockFishingPNG_00000.png",
    10: "/images/Final_All/Bonus/BonusPNG.png",
    11: "/images/Final_All/E-Sport/E- SportPNG.png",
    // 12: "//assets/img/my_local_images/poker.png",
    // 13: "//assets/img/my_local_images/others.png",
    // 14: "//assets/img/my_local_images/premium.png",
  };

  const activeImageMap = {
    1: "/images/Final_All/Slot/APNG Slot.png",
    2: "/images/Final_All/Casino/APNGLive Casino.png",
    3: "/images/Final_All/Sport Book/Sport Sport Book APNG.png",
    4: "/images/Final_All/Virtual Sport/APNG Virtual sport.png",
    5: "/images/Final_All/Lottery/APNG Lottery.png",
    // 6: "/./assets/my_local_images/qipai.png",
    7: "/images/Final_All/P2P/APNG P2P.png",
    8: "/images/Final_All/Fishing/APNG fishing.png",
    9: "/images/Final_All/Cock Fighting/Cock Fishing APNG.png",
    10: "/images/Final_All/Bonus/APNG Bonus.png",
    11: "/images/Final_All/E-Sport/APNG E-sport.png",
    // 12: "/assets/my_local_images/poker.png",
    // 13: "/assets/my_local_images/others.png",
    // 14: "/assets/my_local_images/premium.png",
  };

  const hotGame =  '/images/Final_All/Hot Game/Hot Game Fire.png';
  const activeHotGame = '/images/Final_All/Hot Game/Hopt Game APNG/Hopt Game APNG.png'

  const hotImg = type === "hot" ? activeHotGame : hotGame ;
  // Use the first game type's image as a fallback for All Games/Hot Games
  const defaultTabImg = gameTabs && gameTabs.length > 0 ? gameTabs[0].img : "";

  return (
    <div className="px-1 lg:block">
      {/* Modern Tab Navigation */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x snap-mandatory">
        {/** Each tab is a snap-center, touch-friendly, shadowed card */}
        {/* 2D Tab */}
        <button
          className={`relative flex flex-col items-center justify-center min-w-[68px] p-2 rounded-xl transition-all duration-300 shadow-md backdrop-blur-md bg-gradient-to-br border-2 border-transparent group snap-center active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 select-none
            ${type === "2d"
              ? "from-yellow-400/90 to-orange-500/90 border-yellow-400 ring-2 ring-yellow-300/60 shadow-lg"
              : "from-slate-800/80 to-slate-900/80 hover:from-yellow-200/30 hover:to-orange-200/30 hover:border-yellow-400/60"}
          `}
          style={{boxShadow: '0 2px 12px 0 rgba(0,0,0,0.14)'}}
          onClick={() => navigate("/2d")}
        >
          <img
            src={TwoDLogo}
            className="w-8 h-8 mb-1 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
            alt="2D"
          />
          <span className="text-xs font-extrabold text-white drop-shadow-md tracking-wide group-hover:text-yellow-300" style={{textShadow:'0 1px 4px #000'}}>2D</span>
        </button>

        {/* Shan Game Tab */}
        <button
          className={`relative flex flex-col items-center justify-center min-w-[68px] p-2 rounded-xl transition-all duration-300 shadow-md backdrop-blur-md bg-gradient-to-br border-2 border-transparent group snap-center active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 select-none
            ${type === "digitbet"
              ? "from-yellow-400/90 to-orange-500/90 border-yellow-400 ring-2 ring-yellow-300/60 shadow-lg"
              : "from-slate-800/80 to-slate-900/80 hover:from-yellow-200/30 hover:to-orange-200/30 hover:border-yellow-400/60"}
          `}
          style={{boxShadow: '0 2px 12px 0 rgba(0,0,0,0.14)'}}
          onClick={() => navigate("/shan")}
        >
          <img
            src={shanLogo}
            className="w-8 h-8 mb-1 object-contain rounded drop-shadow-lg group-hover:scale-105 transition-transform"
            alt="Shan Game"
          />
          <span className="text-xs font-extrabold text-white drop-shadow-md tracking-wide group-hover:text-yellow-300 text-center" 
          style={{textShadow:'0 1px 4px #000'}}>ShanKoMe</span>
        </button>

        {/* Hot Games Tab */}
        <button
          className={`relative flex flex-col items-center justify-center min-w-[68px] p-2 rounded-xl transition-all duration-300 shadow-md backdrop-blur-md bg-gradient-to-br border-2 border-transparent group snap-center active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 select-none
            ${type === "hot"
              ? "from-yellow-400/90 to-orange-500/90 border-yellow-400 ring-2 ring-yellow-300/60 shadow-lg"
              : "from-slate-800/80 to-slate-900/80 hover:from-yellow-200/30 hover:to-orange-200/30 hover:border-yellow-400/60"}
          `}
          style={{boxShadow: '0 2px 12px 0 rgba(0,0,0,0.14)'}}
          onClick={() => navigate("/?type=hot")}
        >
          <img
            src={hotImg}
            className="w-8 h-8 mb-1 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
            alt="Hot Games"
          />
          <span className="text-xs font-extrabold text-white drop-shadow-md tracking-wide group-hover:text-yellow-300" style={{textShadow:'0 1px 4px #000'}}>Hot Games</span>
        </button>

        {/* Dynamic Game Type Tabs */}
        {gameTabs &&
          gameTabs
            .filter((item) => ![6, 12, 13, 14].includes(item.id))
            .map((item) => (
              <button
                key={item.id}
                className={`relative flex flex-col items-center justify-center min-w-[68px] p-2 rounded-xl transition-all duration-300 shadow-md backdrop-blur-md bg-gradient-to-br border-2 border-transparent group snap-center active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 select-none
                  ${type == item.id
                    ? "from-yellow-400/90 to-orange-500/90 border-yellow-400 ring-2 ring-yellow-300/60 shadow-lg"
                    : "from-slate-800/80 to-slate-900/80 hover:from-yellow-200/30 hover:to-orange-200/30 hover:border-yellow-400/60"}
                `}
                style={{boxShadow: '0 2px 12px 0 rgba(0,0,0,0.14)'}}
                onClick={() => navigate(`?type=${item.id}`)}
              >
                <img
                  src={
                    type == item.id
                      ? activeImageMap[item.id]
                      : baseImageMap[item.id]
                  }
                  className="w-8 h-8 mb-1 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                  alt={item.name}
                />
                <span className="text-xs font-extrabold text-white drop-shadow-md tracking-wide group-hover:text-yellow-300 text-center" style={{textShadow:'0 1px 4px #000'}}>{item.name}</span>
              </button>
            ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Game Lists */}
        {type && provider && <GameList loading={loading} />}
        
        {type == "hot" && (
          <div className="space-y-4">
            <h5 className="text-xl font-bold text-yellow-400">{content?.game_type?.hot}</h5>
            <GameList loading={loading} games={hot_games} />
          </div>
        )}

        {/* All Games View - Show all providers for each type */}
        {type == "all" && !provider && (
          <div className="space-y-8">
            {gameTabs &&
              gameTabs.map((tab, index) => (
                <div className="w-full" key={index}>
                  <h4 className="mb-4 text-xl font-bold text-yellow-400 px-1">
                    {tab.name}
                  </h4>
                  <ProviderList typeCode={tab?.code} type={tab} />
                </div>
              ))}
          </div>
        )}

        {/* Individual Type View - Show providers for specific type */}
        {!provider &&
          gameTabs &&
          gameTabs.map(
            (tab, index) =>
              type == tab.id && (
                <div className="w-full" key={index}>
                  <h5 className="mb-4 text-lg font-semibold text-white">{tab.name}</h5>
                  <ProviderList typeCode={tab?.code} type={tab} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default GameTabsLg;
