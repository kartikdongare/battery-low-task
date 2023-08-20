/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/context";
import Papa from "papaparse";
import Chart from "react-apexcharts";
const Home = () => {
  const { setInputData } = useData();
  const [graph,setGraph]=useState(false)
  const navTo = useNavigate();
  const [csvdata, setCsvData] = useState({
    projectName: "",
    projectDesc: "",
    client: "",
    contractor: "",
    maxX: "",
    minX: "",
    maxY: "",
    minY: "",
    maxZ: "",
    minZ: "",
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    const type = ["text/csv"];
    console.log(type.includes(file.type), "skd");
    if (type.includes(file.type)) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data.slice(0, 1361));
          setGraph(true)
        },
      });
    } else {
      setError(true);
    }
  };

  const getData = () => {
    let x = data && data.map((ele) => ele.X);
    let y = data && data.map((ele) => ele.Y);
    let z = data && data.map((ele) => ele.Z);
    setCsvData({
      ...csvdata,
      maxX: Math.max(...x),
      minX: Math.min(...x),
      maxY: Math.max(...y),
      minY: Math.min(...y),
      maxZ: Math.max(...z),
      minZ: Math.min(...z),
    });
  };
  useCallback(() => {
    getData();
  }, [csvdata]);
  useEffect(() => {
    getData();
  }, [data]);
  console.log(data, "data");
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputData([csvdata]);
    navTo("/result-page");
  };

  const KP = data.slice(0, 30).map((ele) => ele.KP);
  const xData = data.slice(0, 30).map((ele) => ele.X);
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: KP,
        title: {
          text: "X Data",
        },
      },

      yaxis: {
        lines: {
          show: false,
        },
        title: {
          text: "KP",
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        dashArray: 0,
      },
      title: {
        text: "XYZ company planning to develop a system for the oil and gas industry",
        align: "left",
      },
    },
    series: [
      {
        name: "series-1",
        data: xData,
      },
    ],
  };
  return (
    <div className="home">
      <form className="main-home">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            value={csvdata.projectName}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>
              setCsvData({ ...csvdata, projectName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Project Description</label>
          <input
            onChange={(e) =>
              setCsvData({ ...csvdata, projectDesc: e.target.value })
            }
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Client</label>
          <input
            onChange={(e) => setCsvData({ ...csvdata, client: e.target.value })}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contractor</label>
          <input
            onChange={(e) =>
              setCsvData({ ...csvdata, contractor: e.target.value })
            }
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload file</label>
          <input
            type="file"
            accept=".csv,.xml,.xlsx"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleFileSubmit}
          />
          {error && <div>Please only upload CSV file</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">max_X</label>
          <input
            onChange={(e) => setCsvData({ ...csvdata, maxX: e.target.value })}
            value={csvdata.maxX}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">min_X</label>
          <input
            value={csvdata.minX}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCsvData({ ...csvdata, minX: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">max_Y</label>
          <input
            value={csvdata.maxY}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCsvData({ ...csvdata, maxY: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">min_Y</label>
          <input
            value={csvdata.minY}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCsvData({ ...csvdata, minY: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">max_Z</label>
          <input
            value={csvdata.maxZ}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCsvData({ ...csvdata, maxZ: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">min_Z</label>
          <input
            value={csvdata.minZ}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCsvData({ ...csvdata, minZ: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary "
          onClick={handleSubmit}
        >
          See Input Values
        </button>
      </form>
      {graph&&(
        <div style={{width:'70%'}}>
        <Chart
          className="graph"
          options={state.options}
          series={state.series}
          type="line"
        />
      </div>
      )}
    </div>
  );
};
export default Home;
