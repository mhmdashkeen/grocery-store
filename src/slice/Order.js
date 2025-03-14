import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "@firebase/firestore";

const initialState = {
  orderLists: null,
  loading: false,
  allOrderLists: []
};
const orderRef = collection(db, "orders");

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const q = query(
    orderRef,
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );
  const res = await getDocs(q);
  return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
});

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  const q = query(orderRef, orderBy("createdAt", "desc"));
  const res = await getDocs(q);
  return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
});

export const updateUserWithOrders = createAsyncThunk(
  "order/updateUserWithOrders",
  async (data) => {
    await addDoc(orderRef, data);
  }
);

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  console.log("ID", id);
  const orderDoc = doc(db, "orders", id);
  await deleteDoc(orderDoc);
  return id;
});
export const markDeliver = createAsyncThunk("order/deliver", async (data) => {
  const orderDoc = doc(db, "orders", data.id);
  await updateDoc(orderDoc, data);
  return data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.orderLists = action.payload;
      })
      .addCase(getAllOrders.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.allOrderLists = action.payload;
      })
      .addCase(updateUserWithOrders.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(updateUserWithOrders.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(updateUserWithOrders.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(deleteOrder.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.orderLists = state.orderLists.filter(
          (o) => o.id !== action.payload
        );
      })
      .addCase(markDeliver.fulfilled, (state, action) => {
        state.orderLists = state.orderLists.map((o) =>
          o.id === action.payload.id ? { ...o, isDelivered: !o.isDelivered } : o
        );
      });
  }
});

export default orderSlice.reducer;
