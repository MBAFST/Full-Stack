export default function Animal({ type, name, age }: any) {
	return (
		<li>
			<strong>{type}</strong> {name}, {age}
		</li>
	);
}
