interface UserData {
  name: string,
  birthdate: string,
  address: string,
  city: string,
  phone: string,
}

interface User extends UserData {
  id: number,
}

type Users = User[];