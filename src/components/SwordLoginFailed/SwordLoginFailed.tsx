import s from "./SwordLoginfailed.module.scss"

export function SwordLoginFailed({ isOpen=false, children=null }) {
	if (!isOpen) {
		return null;
	  }

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				{children}
				<div>
				<p style={{ color: '#e3c30e'}}>
					<b>NIEPOPRAWNY LOGIN LUB HASŁO</b>
				</p>
				</div>
			</div>
		</div>
	);
}
