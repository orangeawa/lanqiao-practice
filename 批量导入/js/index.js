const MockUrl = './data/log.json' // 请求地址

// TODO: 待补充代码 目标 1
const fetchData = async () => (await axios.get(MockUrl)).data.data

/** @param {Array} resData */
const doConvert = (resData) =>
    // TODO: 待补充代码，目标 2
    resData.map((x) =>
        resolveDefinitionList.map((t, i) =>
            dataConverter[t]({
                tempData: x.splice(0, (i + 5) >> 2),
                currentTypeDefine: resolveType[t],
            }),
        ),
    )

const outputResult = (tableData) => {
    // 每次输出时先清空上次的结果
    const tableBodyDOM = document.getElementById('result-table')
    tableBodyDOM.innerHTML = ''
    // TODO: 待补充代码：目标 3
    tableData.forEach((rowData) => {
        tableBodyDOM.innerHTML += `<tr>
      <th>${rowData[0].value}</th>
      <td style="color: ${rowData[1].value.color}">${rowData[1].value.text}</td>
      <td>${rowData[2].value}</td>
      <td>${rowData[3].value}</td>
      <td>${rowData[4].value.startTime} ~ ${rowData[4].value.endTime}</td>
      <td>${rowData[4].value.range}</td> 
    </tr>`
    })
}

const handleBatchImport = async () => {
    const resData = await fetchData()
    const tableData = doConvert(resData)
    window.tableData = JSON.stringify(tableData)
    outputResult(tableData)
}

window.handleBatchImport = handleBatchImport
