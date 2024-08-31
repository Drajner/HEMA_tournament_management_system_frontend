import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./FinalsTreePage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {PATHS} from "../../config/paths";

const FightNode = ({ fightNode }) => {
  if (!fightNode) {
    return null;
  }

  const fight = fightNode.fight;

  const firstParticipant = fight?.firstParticipant?.fullName || "Oczekujący";
  const secondParticipant = fight?.secondParticipant?.fullName || "Oczekujący";


  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <div>
        <Link to={`/fight/${fight.id}`}>
          <strong>{firstParticipant}</strong> vs <strong>{secondParticipant}</strong>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div>{fightNode.firstChildNode && <FightNode fightNode={fightNode.firstChildNode} />}</div>
        <div>{fightNode.secondChildNode && <FightNode fightNode={fightNode.secondChildNode} />}</div>
      </div>
    </div>
  );
};

const FinalsTree = ({ data }) => {
  if (!data) {
    return <div>Brak dostępnych finałów</div>;
  }

  const [ finals, thirdPlace ] = data;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div style={{ marginRight: "100px", textAlign: "center" }}>
        <h3>Walka o trzecie miejsce</h3>
        <FightNode fightNode={thirdPlace} />
      </div>

      <div style={{ textAlign: "center" }}>
        <h3>Finały</h3>
        <FightNode fightNode={finals} />
      </div>
    </div>
  );
};

export const FinalsTreePage = () => {
  const [finals, setFinals] = useState(null);

  const { number } = useParams();

  useEffect(() => {
    sendRequestGET(`tournaments/getFinals/${number}`)
      .then(async response => {
        const finalsData = await response.json();
        console.log("Fetched finals data:", finalsData);
        setFinals(finalsData);
      })
      .catch(err => console.error("Error fetching finals:", err));
  }, [number]);

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
        <h1 className={s.headerUp}>Drabinka finałowa</h1>
        {finals ? <FinalsTree data={finals} /> : <p>Loading...</p>}
      </div>
    </TemplatePage>
  );
};