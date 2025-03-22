import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center text-white">
      <h1 className="text-2xl font-semibold text-white">Om HBayO</h1>

      <p className="mb-4">
        HBayO er en enkel og intuitiv filmplatform, hvor du kan udforske film
        opdelt efter genre,
      </p>
      <p className="mb-4">se detaljer, og oprette din egen ønskeliste.</p>
      <p>
        Projektet er bygget med React, Tailwind CSS og data fra The Movie
        Database (TMDB).
      </p>
    </div>
  );
}
