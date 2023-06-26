import axios from 'axios';

export const useViaCep = () => {
  const getAddressInfo = async (cep) => {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (res.data.erro) return { code: 'BAD_REQUEST', message: "CEP not found!" }
    if (res.data.uf !== 'AM') return { code: 'CONFLICT', message: "You are outside the Amazonas state!" }

    return {
      cep,
      city: res.data.localidade,
      street: res.data.logradouro,
      neighborhood: res.data.bairro,
      uf: res.data.uf
    }
  }

  return { getAddressInfo }
}