import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export const sneakersApi = createApi({
  reducerPath: "sneakersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn() {
        try {
          const sneakersRef = collection(db, "sneakers");
          const querySnapshot = await getDocs(sneakersRef);
          let sneakers = [];

          querySnapshot?.forEach((doc) => {
            sneakers.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: sneakers };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = sneakersApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase.config";

// export const sneakersApi = createApi({
//   reducerPath: "sneakersApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "",
//   }),

//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       async queryFn() {
//         const sneakersRef = collection(db, "sneakers");
//         const querySnapshot = await getDocs(sneakersRef);
//         let sneakers = [];

//         querySnapshot?.forEach((doc) => {
//           sneakers.push({
//             id: doc.id,
//             ...doc.data(),
//           });
//         });

//         return { data: sneakers }; // Успішний результат

//         // Або, якщо є помилка, можна використовувати throw error
//         // throw new Error("Some error message");
//       },
//     }),
//   }),
// });

// export const { useGetProductsQuery } = sneakersApi;
