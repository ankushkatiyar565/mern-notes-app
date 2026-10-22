import express from "express";
import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import "dotenv/config.js";


const server_URL = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    const data = await mongoose.connect(server_URL);  
    console.log("db connected...");
  } catch (error) {
    console.log("db not connected...",error);
  }
};
export default connectDb;
