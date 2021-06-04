export default function savingIR(bn,ts,csi){
    const savingRate = [
		{
		  "no": 1,
		  "1": 0.25,
		  "2": 0.375,
		  "3": 0.5,
		  "4": 0.5,
		  "5": 0.5
		},
		{
		  "no": 2,
		  "1": 0.25,
		  "2": 0.32,
		  "3": 0.4,
		  "4": 0.4,
		  "5": 0.45
		},
		{
		  "no": 3,
		  "1": 0.25,
		  "2": 0.32,
		  "3": 0.4,
		  "4": 0.4,
		  "5": 0.45
		},
		{
		  "no": 4,
		  "1": 0.25,
		  "2": 0.32,
		  "3": 0.4,
		  "4": 0.4,
		  "5": 0.45
		},
		{
		  "no": 5,
		  "1": 0.25,
		  "2": 0.32,
		  "3": 0.4,
		  "4": 0.4,
		  "5": 0.45
		},
		{
		  "no": 6,
		  "1": 0.125,
		  "2": 0.4,
		  "3": 0.5,
		  "4": 0.6,
		  "5": 0.6
		},
		{
		  "no": 7,
		  "1": 0.25,
		  "2": 0.5,
		  "3": 0.6,
		  "4": 0.75,
		  "5": 0.8
		},
		{
		  "no": 8,
		  "1": 0.2,
		  "2": 0.5,
		  "3": 0.6,
		  "4": 0.75,
		  "5": 0.8
		},
		{
		  "no": 9,
		  "1": 0.125,
		  "2": 0.4,
		  "3": 0.5,
		  "4": 0.5,
		  "5": 0.5
		},
		{
		  "no": 10,
		  "1": 0.25,
		  "2": 0.65,
		  "3": 0.7,
		  "4": 0.85,
		  "5": 0.95
		},
		{
		  "no": 11,
		  "1": 0.125,
		  "2": 0.3,
		  "3": 0.4,
		  "4": 0.5,
		  "5": 0.75
		},
		{
		  "no": 12,
		  "1": 0.25,
		  "2": 0.5,
		  "3": 0.55,
		  "4": 0.75,
		  "5": 0.8
		},
		{
		  "no": 13,
		  "1": 0.25,
		  "2": 0.85,
		  "3": 0.95,
		  "4": 1.05,
		  "5": 1.1
		},
		{
		  "no": 14,
		  "1": 0.35,
		  "2": 0.7,
		  "3": 0.8,
		  "4": 0.95,
		  "5": 1
		},
		{
		  "no": 15,
		  "1": 0.4,
		  "2": 0.95,
		  "3": 1,
		  "4": 1.2,
		  "5": 1.3
		},
		{
		  "no": 16,
		  "1": 0.25,
		  "2": 0.375,
		  "3": 0.5,
		  "4": 0.5,
		  "5": 0.5
		}
	];
    if(bn !== 17){
        return savingRate.find(({no}) => no === bn)[ts]
        
    }else{
        return csi
    }
}