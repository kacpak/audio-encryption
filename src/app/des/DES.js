class DES {
	
	static encrypt(binaryString, roundKeys) {
		var result = "";
		var blocks = splitIntoBlocks(binaryString);
		
		for(var b of blocks) {
			result += encryptBlock(b, roundKeys);
		}
	
		return result;
	}

    static decrypt(binaryString, roundKeys) {
        for (var i = 0; i < roundKeys.length / 2; i++) {
            var temp = roundKeys[i];
            roundKeys[i] = roundKeys[roundKeys.length - i - 1];
            roundKeys[roundKeys.length - i - 1] = temp;
        }

        var result = "";
        var blocks = splitIntoBlocks(binaryString);
        
		for(var b of blocks) {
			result += decryptBlock(b, roundKeys);
		}
	
		return result;
    }
	
	static splitIntoBlocks(binaryString) {
        var bin = "";
        var binaryBlocks = new Array();
        for (var i = 0; i < binaryString.length(); i++) {
            bin += binaryString.charAt(i);
            if (bin.length() == 64) {
                binaryBlocks.push(bin);
                bin = "";
            }
        }

        if (bin.length() != 0) {
            while (bin.length() != 64)
                bin = "0" + bin;
            binaryBlocks.push(bin);
        }
		
        return binaryBlocks;
    }
	
	static encryptBlock(binaryStringBlock, roundKeys) {

        var ip = IP.initialPermutation(binaryStringBlock);

        var halves = Rounds.splitInHalf(ip);
        var halvesTemp = new Array(2);
        for (var j = 0; j < 16; j++) {
            halvesTemp = Rounds.round(halves[0], halves[1], roundKeys[j]);
            halves = halvesTemp;
        }

        //zamiana połówek stronami
        var temp = halves[0];
        halves[0] = halves[1];
        halves[1] = temp;

        temp = halves[0] + halves[1];

        return IP.inversePermutation(temp);
    }
	
	static decryptBlock(binaryStringBlock, roundKeys) {

        return encryptBlock(binaryStringBlock, roundKeys);
    }
}