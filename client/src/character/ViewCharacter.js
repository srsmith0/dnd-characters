import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

function ViewCharacter(props) {
	const [ char, setChar ] = useState([]);
	const [ armors, setArmor ] = useState([]);
	const [ weapons, setWeapons ] = useState([]);
	const [ skills, setSkills ] = useState([]);
	const [ inventory, setInventory ] = useState([]);

	useEffect(() => {
		getChar();
		getArmor();
		getWeapon();
		getSkills();
		getInventory();
	}, []);

	function getChar() {
		axios
			.get(`/api/users/${props.auth.user.id}/characters/${props.location.charProps.id}`)
			.then((res) => {
				setChar(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function getArmor() {
		axios.get(`/api/armor/${props.location.charProps.id}`).then((res) => {
			setArmor(res.data);
		});
	}

	function getWeapon() {
		axios.get(`/api/weapons/${props.location.charProps.id}`).then((res) => {
			setWeapons(res.data);
		});
	}

	function getSkills() {
		axios.get(`/api/skills/${props.location.charProps.id}`).then((res) => {
			setSkills(res.data);
		});
	}

	function getInventory() {
		axios.get(`api/inventory/${props.location.charProps.id}`).then((res) => {
			setInventory(res.data);
		});
	}

	return (
		<div style={{ color: 'white' }}>
			<h1>Character Sheet</h1>
			<h3>
				Name: {char.name} Race: {char.race} Class: {char.character_class} Level: {char.level} Alignment:{' '}
				{char.alignment} Experience Points: {char.xp}
			</h3>
			<br />
			<h2>Attributes</h2>
			<br />
			<h6>Strength: {skills.map((a) => <p>{a.strength}</p>)}</h6>
			<h6>Dexterity: {skills.map((a) => <p>{a.strength}</p>)}</h6>
			<h6>Constitution: {skills.map((a) => <p>{a.constitution}</p>)}</h6>
			<h6>Intelligence: {skills.map((a) => <p>{a.intelligence}</p>)}</h6>
			<h6>Wisdom: {skills.map((a) => <p>{a.wisdom}</p>)}</h6>
			<h6>Charisma: {skills.map((a) => <p>{a.charisma}</p>)}</h6>
			<h6>Speed: {skills.map((a) => <p>{a.speed}</p>)}</h6>
			<hr />
			<h2>Armor:</h2>
			<br />
			{armors.map((a) => (
				<div>
					<h4>Armor Name: {a.name}</h4>
					<h6>Description: {a.description}</h6>
					<h6>Armor Class: {a.armor_class}</h6>
				</div>
			))}
			<hr />
			<h2>Weapons:</h2>
			<br />
			{weapons.map((a) => (
				<div>
					<h4>Name: {a.name}</h4>
					<h6>Description: {a.description}</h6>
					<h6>Damage: {a.damage}</h6>
					<h6>Range: {a.range}</h6>
				</div>
			))}
			<hr />
			<h2>Inventory</h2>
			<br />
			{inventory.map((a) => (
				<div>
					<h4>Name: {a.name}</h4>
					<h6>Description: {a.description}</h6>
				</div>
			))}
		</div>
	);
}

const ConnectedViewCharacter = (props) => {
	return <AuthConsumer>{(auth) => <ViewCharacter {...props} auth={auth} />}</AuthConsumer>;
};

export default ConnectedViewCharacter;
