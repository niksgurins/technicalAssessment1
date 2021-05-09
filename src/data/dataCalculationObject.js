const DCO = {
    sliceData: (data, timeSpan, prev) => {
        if (prev) {
            if (data.length >= (timeSpan * 2))
                return data.slice(data.length - (timeSpan * 2), data.length - timeSpan);
            else if (data.length <= (timeSpan * 2) && data.length > timeSpan)
                return data.slice(0, timeSpan);
            else
                return data.slice(0);
        } else {
            if (data.length <= timeSpan)
                return data.slice(0);
            else
                return data.slice(data.length - timeSpan);
        }
    },

    sumTimespan: (data, timeSpan) => {
        let total = 0;
        let specificDataSet = DCO.sliceData(data, timeSpan, false).map(item => item.value);
        total = specificDataSet.reduce((sum, current) => sum + current);
        return total;
    },

    sumPreviousTimeSpan: (data, timeSpan) => {
        let total = 0;
        let specificDataSet = DCO.sliceData(data, timeSpan, true).map(item => item.value);
        total = specificDataSet.reduce((sum, current) => sum + current);
        return total;
    },

    getPercentageDiff: (data, timeSpan) => {
        return (((DCO.sumTimespan(data, timeSpan) / DCO.sumPreviousTimeSpan(data, timeSpan)) * 100) - 100).toFixed(2);
    }
}

export default DCO;