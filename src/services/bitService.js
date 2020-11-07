import React from 'react'

const bitService = () => {
	const _apiBase = 'http://194.67.90.67/api/v1'

	const getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${this._apiBase} , received ${res.status}`)
		}
		return await res.json();
	}

	const getToken = async () => {
		const res = await this.getResource(`/token`);
		return res.map(this._transformCharacter);
	}

	
	return (
		<div>
			
		</div>
	)
}

export default bitService
