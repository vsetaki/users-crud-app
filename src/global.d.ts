interface CommonData {
  name: string,
  address: string,
  city: string,
  phone: string,
}

interface UserData extends CommonData {
  birthdate: string,
}

interface UserFormData extends CommonData {
  id: number,
  birthdateDate: number,
  birthdateMonth: number,
  birthdateYear: number,
}

interface User extends UserData {
  id: number,
}

type Users = User[];