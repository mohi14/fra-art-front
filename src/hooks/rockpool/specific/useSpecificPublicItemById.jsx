import axios from 'axios'
import { data } from 'jquery'
import { useEffect } from 'react'
import { useState } from 'react'
export const useSpecificPublicItemById = (rockpoolItemId, chainId) => {
  const [loading, setLoading] = useState(true)
  const [noItems, setNoItems] = useState(true)
  const [items, setItems] = useState(
    {
      id:0,
      fractions: 0,
      duration:0,
      priceMultiplier: 0,
      targetPrice: 0,
      status: false,
      progress: 0,
      userParticipation:0,
      isErc721Available: false,
      image: "",
      price: 0,
      fractionsCount: 0,
      reservePrice: 0,
      fee: 0,
      title: "",
      amount: 0,
  }
  )

  const url = `https://testnet.fra-art.com/api/getRockpoolOne`
  useEffect(() => {
    fetch(`https://testnet.fra-art.com/api/getRockpoolOne/${rockpoolItemId}`, {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	  })
		.then((res) => res.json())
		.then((data) => {
      console.log("data",data)
      if (data) setItems(data);
      else setItems({
        id:0,
        fractions: 0,
        duration:0,
        priceMultiplier: 0,
        targetPrice: 0,
        status: false,
        progress: 0,
        userParticipation:0,
        isErc721Available: false,
        image: "",
        price: 0,
        fractionsCount: 0,
        reservePrice: 0,
        fee: 0,
        title: "",
        amount: 0,
      });
      setLoading(false);
      if (data.items?.length === 0) setNoItems(true);
		})
		.catch((err) => console.log(err));

   
  }, [loading])

  return { loading, items }
}
