class StringUtility {

	/**
	 * Calculate a 32 bit FNV-1a hash
	 * Found here: https://gist.github.com/vaiorabbit/5657561
	 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
	 *
	 * @param {number} [seed] optionally pass the hash of the previous chunk
	 * @returns {number}
	 */
	public hashCode(text: string, seed: number = 0x811c9dc5): number {
		var hval: number = seed;
		for (var i:number = 0; i<text.length; i++) {
			hval ^= text.charCodeAt(i);
			hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
		}
		return hval >>> 0;
	}
}

export = StringUtility;
