"use client"

import { useEffect, useState } from "react"
import { api } from "../services";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(async () => {
    const token = localStorage.getItem("auth");
    const user = await api.getUser(token)
    setUser(user)
  }, [])

  return <h1>Hello, {user?.name}!</h1>
}