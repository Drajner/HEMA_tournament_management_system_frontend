import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./FinalsTreePage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";

const FightNode = ({ fightNode }) => {
    if (!fightNode) return null;
  
    return (
      <div style={{ margin: "20px", textAlign: "center" }}>
        <div>
          <strong>{fightNode.fight.firstParticipant.fullName}</strong> vs <strong>{fightNode.fight.secondParticipant.fullName}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          {/* Render left and right child fights recursively */}
          <div>{fightNode.leftChildNode && <FightNode fightNode={fightNode.leftChild} />}</div>
          <div>{fightNode.rightChildNode && <FightNode fightNode={fightNode.rightChild} />}</div>
        </div>
      </div>
    );
  };
  
  // Tree component to render the tournament bracket
  const TournamentTree = ({ data }) => {
    const { finals, thirdPlace } = data;
    console.log(finals);
    console.log(thirdPlace);
  
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        {/* Third Place Fight on the left */}
        <div style={{ marginRight: "100px", textAlign: "center" }}>
          <h3>Third Place</h3>
          <FightNode fightNode={thirdPlace} />
        </div>
  
        {/* Finals Fight in the center */}
        <div style={{ textAlign: "center" }}>
          <h3>Finals</h3>
          <FightNode fightNode={finals} />
        </div>
      </div>
    );
  };

export const FinalsTreePage = () => {

    const [finals, setFinals] = useState([]);

  // Retrieve the dynamic number from the URL
    const { number } = useParams();

    useEffect(() => {
        // Fetch data for Grupy (groups)
        sendRequestGET('tournaments/getFinals/'+number)
        .then(async response => {
            const finalsData = await response.json();
            setFinals(finalsData);
            console.log(finalsData);
        })
        .catch(err => console.error("Error fetching finals:", err));
    }, []);

    return (
      <div>
        <h1>Tree Structure</h1>
        <TournamentTree data={finals} />
      </div>
    );
  };