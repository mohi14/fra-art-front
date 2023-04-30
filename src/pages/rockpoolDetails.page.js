import { Link, useParams } from "react-router-dom";
import SpecificDetailPage from '../components/SpecificDetailPage'

import {
  ethereum,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  profileDefault,
  collectionDefault,
  openseaIcon,
  greenFlag,
  notAvailableIcon,
} from "../utils/images.util";

const RockpoolDetails = () => {
  const { id } = useParams();
  const CHAIN_ID = process.env.REACT_APP_NETWORK_ID
  const AuctionData = [
    {
      image: gif1,
      title: "Deep Sea Phantasy",
      id: 1,
      price: 0.4,
      type: "GIFs",
      progress: 50,
      nfts: 0,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "games"],
    },
    {
      image: item1,
      title: "CyberPrimal 042 LAN",
      id: 2,
      price: 0.4,
      type: "Arts",
      progress: 5,
      nfts: 0,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif2,
      title: "Crypto Egg Stamp #5",
      id: 3,
      price: 0.4,
      type: "Games",
      progress: 75,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music", "meme"],
    },
    {
      image: item2,
      title: "Colorful Abstract Painting",
      id: 4,
      price: 0.4,
      type: "Art",
      progress: 12,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "video"],
    },
    {
      image: item3,
      title: "Liquid Forest Princess",
      id: 5,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif3,
      title: "Spider Eyes Modern Art",
      id: 6,
      price: 0.4,
      type: "GIFs",
      progress: 25,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: item4,
      title: "Synthwave Painting",
      id: 7,
      price: 0.4,
      type: "",
      progress: 30,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif4,
      title: "Contemporary Abstract",
      id: 8,
      price: 0.4,
      type: "GIFs",
      progress: 44,
      nfts: 0,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
    {
      image: item5,
      title: "Valkyrie Abstract Art",
      id: 9,
      price: 0.4,
      type: "",
      progress: 21,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif5,
      title: "The girl with the firefly",
      id: 10,
      price: 0.4,
      type: "",
      progress: 4,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: item6,
      title: "Dodo hide the seek",
      id: 11,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: gif6,
      title: "Pinky Ocean",
      id: 12,
      price: 0.4,
      type: "",
      progress: 20,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
  ];

  return (
	<>
	<SpecificDetailPage chainId={Number(CHAIN_ID) || 1} specificPoolId={id} />
	</>
	);
};

export default RockpoolDetails;
