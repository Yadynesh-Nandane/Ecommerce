/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const LoginSecurityEdit = ({ value, name }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-black/50 last:border-b-0">
      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span>{value}</span>
      </div>
      <Link
        to={`/security/edit/${name.toLowerCase().replace(/\s/g, "")}`}
        className="text-lg px-5 py-2 border border-black/80 bg-slate-200 rounded-md"
      >
        Edit
      </Link>
    </div>
  );
};

export default LoginSecurityEdit;
