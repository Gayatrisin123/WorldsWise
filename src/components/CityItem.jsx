import React from "react";
import styles from "./CityItem.module.css";
import { Link, useNavigate } from "react-router-dom";
//importing for adding the selected featue
import { useCities } from "../contexts/CitiesContext";
export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  //click handler
  //const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    await deleteCity(id);
    //navigate("/app/cities");
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}></span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>{date}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          X
        </button>
      </Link>
    </li>
  );
}
