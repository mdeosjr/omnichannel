"use client"

import { useEffect, useState } from "react"
import { api, useViaCep } from "../services";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    password: ""
  });

  const [addressData, setAddressData] = useState({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    uf: ""
  })

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("auth");
      const { data } = await api.getUser(token)

      const { address, ...user } = data;
      setUser(data)
      setUserData(user)
      setAddressData(address)
    }

    getUser()
  }, [])

  const router = useRouter();

  async function register(e) {
    e.preventDefault();

    try {
      await api.createUser({ ...userData, address: addressData });
      router.push('/sign-in');
    } catch (e) {
      alert(e.response.data)
    }
  }

  function handleInput(e) {
    if (e.target.attributes['name'].nodeValue === 'number') {
      setAddressData({
        ...addressData,
        [e.target.name]: e.target.value
      })
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      })
    }
  }

  function handleCepInput(e) {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    })

    if (e.target.value.length === 8) {
      useViaCep().getAddressInfo(e.target.value).then((res) => {
        if (res.code) {
          alert(res.message)
        }

        setAddressData({
          cep: res.cep,
          city: res.city,
          street: res.street,
          neighborhood: res.neighborhood,
          uf: res.uf,
          number: ''
        }
        );
      })
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Welcome, {user?.name}!</h1>
        <form className="mt-6" onSubmit={register}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              placeholder="Enter your name"
              name="name"
              value={userData.name}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-semibold text-gray-800"
            >
              Age
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              placeholder="Enter your age"
              name="age"
              value={userData.age}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              placeholder="Enter your email address"
              name="email"
              value={userData.email}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cep"
              className="block text-sm font-semibold text-gray-800"
            >
              CEP
            </label>
            <input
              type="text"
              maxLength={8}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              placeholder="Enter your cep"
              name="cep"
              value={addressData.cep}
              onChange={handleCepInput}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-semibold text-gray-800"
            >
              Street
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              name="street"
              value={addressData.street}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-sm font-semibold text-gray-800"
            >
              Number
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              name="number"
              value={addressData.number}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="neighborhood"
              className="block text-sm font-semibold text-gray-800"
            >
              Neighborhood
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required

              name="neighborhood"
              value={addressData.neighborhood}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-800"
            >
              City
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              name="city"
              value={addressData.city}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="uf"
              className="block text-sm font-semibold text-gray-800"
            >
              UF
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              name="uf"
              value={addressData.uf}
              disabled
            />
          </div>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}