import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthData, resetAuth } from "./authSlice";

const apiUrl = "http://localhost:3000/api/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  // Determine if the request is for a registration endpoint
  const isRegistrationRequest = args.url.includes("/register/");
  // Set credentials based on the request type
  const result = await baseQuery(args, api, {
    ...extraOptions,
    credentials: isRegistrationRequest ? "omit" : "include",
  });

  return result;
};

//Data validation for login both user and company
function loginUserAuthentication(credentials) {
  const { email } = credentials;

  if (email.includes("@") || email.length < 8) {
    throw new Error("Invalid email!");
  }
}

//Data validations for registration of a employee
function registerUserAuthentication(userData) {
  const {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    termsAccepted,
  } = userData;

  //Checks if the email is correct and if it is short
  if (!email.includes("@") || email.length < 8) {
    throw new Error("Invalid email!");
  }

  //Checks if the password is too short
  if (password.length < 8) {
    throw new Error("Too short password! Should be at least 8 symbols!");
  }

  //Checks if the password is only numbers
  if (/^[0-9]+$/.test(password)) {
    throw new Error("Password only with number is not allowed!");
  }

  //Checks for valid confirmed passwords
  if (password !== confirmPassword) {
    throw new Error("Password confirmed incorrect!");
  }

  //Checks if the first and last name are provided
  if (firstName === "" || lastName === "") {
    throw new Error("Fields first name and last name are required!");
  }

  //Checks if the terms are accepted
  if (!termsAccepted) {
    throw new Error("You should agree to the terms of the site");
  }
}

//Data validations for registration of a company
function registerCompanyAuthentication(companyData) {
  const { email, password, companyName, vat, confirmPassword, termsAccepted } =
    companyData;

  if (!email.includes("@") || email.length < 8) {
    throw new Error("Invalid email!");
  }

  if (password.length < 8) {
    throw new Error("Too short password!");
  }

  if (/^[0-9]+$/.test(password)) {
    throw new Error("Password only with number is not allowed!");
  }

  if (password !== confirmPassword) {
    throw new Error("Password confirmed incorrect!");
  }

  //Checks if the company name is provided
  if (companyName === "") {
    throw new Error("The name of the company is required!");
  }

  //Checks if the vat number is only from numbers
  if (!/^[0-9]+$/.test(vat)) {
    throw new Error("VAT is only from numbers!");
  }

  if (!termsAccepted) {
    throw new Error("You should agree to the terms of the site");
  }
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Employee Login
    loginEmployee: builder.mutation({
      query: (credentials) => {
        try {
          loginUserAuthentication(credentials);
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
        return {
          url: "/login/employee",
          method: "POST",
          body: credentials,
        };
      },
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData({ userInfo: data.payload }));
        } catch (error) {
          console.error("Employee login failed:", error);
        }
      },
    }),

    // Company Login
    loginCompany: builder.mutation({
      query: (credentials) => {
        try {
          loginUserAuthentication(credentials);
        } catch (err) {
          console.error(err);
        }
        return {
          url: "/login/employee",
          method: "POST",
          body: credentials,
        };
      },
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData({ userInfo: data.payload }));
        } catch (error) {
          console.error("Company login failed:", error);
          throw new Error(err.message);
        }
      },
    }),

    // Employee Registration
    registerEmployee: builder.mutation({
      query: (userData) => {
        try {
          registerUserAuthentication(userData);
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
        return {
          url: "/register/employee",
          method: "POST",
          body: userData,
        };
      },
    }),

    // Company Registration
    registerCompany: builder.mutation({
      query: (companyData) => {
        try {
          registerCompanyAuthentication(companyData);
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
        return {
          url: "/register/company",
          method: "POST",
          body: companyData,
        };
      },
    }),

    // Token Refresh
    refreshToken: builder.mutation({
      query: () => ({
        url: "/token",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData({ userInfo: data.payload }));
        } catch (error) {
          console.error("Token refresh failed:", error);
          dispatch(resetAuth());
        }
      },
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(resetAuth());
        } catch (error) {
          console.error("Logout request failed:", error);
          dispatch(resetAuth());
        }
      },
    }),

    //Adding new questionnaire
    postQuestionnaire: builder.mutation({
      query: (questions) => ({
        url: "/questionnaire",
        method: "POST",
        body: questions,
      }),
    }),

    postNewJobApplication: builder.mutation({
      query: (jobObject) => ({
        url: "/job",
        method: "POST",
        body: jobObject,
      }),
    }),
  }),
});

export const {
  useLoginEmployeeMutation,
  useLoginCompanyMutation,
  useRegisterEmployeeMutation,
  useRegisterCompanyMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  usePostQuestionnaireMutation,
  usePostNewJobApplicationMutation,
} = authApi;
