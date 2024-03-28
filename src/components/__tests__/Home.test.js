import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../Home";
import "@testing-library/jest-dom";
import { Routes } from "react-router";

it("should render Home component", () => {
    render(<Home/>);

    const heading  = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
})