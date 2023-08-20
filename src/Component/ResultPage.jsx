import { useData } from "../context/context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ResultPage = () => {
  const { inputData } = useData();
  const doc = new jsPDF();
  let info = [];
  inputData.forEach((element) => {
    info.push([
      element.projectName,
      element.projectDesc,
      element.client,
      element.contractor,
      element.maxX,
      element.minX,
      element.maxY,
      element.minY,
      element.maxZ,
      element.minZ,
    ]);
  });
  const handleDownloadPDF = () => {
    autoTable(doc, {
      head: [
        [
          "Project Name",
          "Project Desc",
          "Client",
          "Contractor",
          "Max-X",
          "Min-X",
          "Max-Y",
          "Min-Y",
          "	Max-Z",
          "Min-Z",
        ],
      ],
      body: info,
    });

    doc.save("inputData.pdf");
  };

  return (
    <div className="m-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="row">Sr.No</th>
            <th scope="col">Project Name</th>
            <th scope="col">Project Desc</th>
            <th scope="col">Client</th>
            <th scope="col">Contractor</th>
            <th scope="col">Max-X</th>
            <th scope="col">Min-X</th>
            <th scope="col">Max-Y</th>
            <th scope="col">Min-Y</th>
            <th scope="col">Max-Z</th>
            <th scope="col">Min-Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{inputData[0].projectName}</td>
            <td>{inputData[0].projectDesc}</td>
            <td>{inputData[0].client}</td>
            <td>{inputData[0].contractor}</td>
            <td>{inputData[0].maxX}</td>
            <td>{inputData[0].minX}</td>
            <td>{inputData[0].maxY}</td>
            <td>{inputData[0].minY}</td>
            <td>{inputData[0].maxZ}</td>
            <td>{inputData[0].minZ}</td>
          </tr>
        </tbody>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </table>
    </div>
  );
};

export default ResultPage;
