type UserDetails = {
  id: string;
  username: string;
  email: string;
}

export const mockGetUserDetails = () : Promise<UserDetails> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: "1",
        username: "SEMB",
        email: "semb@samsung.com"
      });
    })
  })
}

type SignInResponse = {
  id: string;
  username: string;
  email: string;
  token: string;

}

export const mockSignIn = (username: string, password: string) : Promise<SignInResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: "1",
        username: "SEMB",
        email: "semb@samsung.com",
        token: "1234",
      })
    })
  })
}