import { Domain } from "domain";
import { userInfo } from "os";

export const allrightUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

export const wrongPassword = {
  email: 'admin@admin.com',
  password: '123',
}

export const wrongEmail = {
  email: 'user.com',
  password: 'secret_admin',
}

export const noEmail = {
  password: 'secret_admin',
}

export const noPassword = {
  email: 'admin@admin.com',
}

export const expectedResult = {
  id: 2,
  userName: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}
