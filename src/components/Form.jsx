// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const base_url = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [geocodeError, setGeocodeError] = useState("");
  const navigate = useNavigate();

  //taking out creare city function f
  const { createCity, isLoading } = useCities();
  //fetching the api which gives information about the cities whose lat and lng we got from url storage
  useEffect(
    () => async () => {
      try {
        setIsLoadingGeocode(true);
        const res = await fetch(`${base_url}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.continentCode) throw new Error("incorrect click mate");
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodeError(err.message);
      } finally {
        setIsLoadingGeocode(false);
      }
    },
    [lat, lng]
  );
  //handling form submission
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
    // console.log(newCity);
  };
  if (isLoadingGeocode) return <Spinner />;
  if (geocodeError) return <Message message={geocodeError} />;
  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
