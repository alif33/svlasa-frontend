import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../__lib__/helpers/HttpService";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import Book from "../Book";
import Card from "../Card";

const Item = ({item, own, fetchData}) => {
  const [join, setJoin] = useState(false);

  useEffect(()=>{
    socket.on(`${item._id}`, (data) => {
        setJoin(data.join);
      });
  },[socket])

  return (
    <tr>
        <td>
            <h5>{moment(item._date).format("llll").split("12")[0]}</h5>
            <h5>{moment(item._time, ["hh:mm A"]).format("hh:mm A")} IST </h5>
        </td>
        <td>
            <h5>
                <Link
                to={`/profile/${item?._owner?.userName}`}
                >
                    {item?._owner?.firstName +
                    " " +
                    item?._owner?.lastName}
                </Link>
                {
                    join && <span className="float-right btn-join"><BsDot size={20}/>joined</span>
                }
            </h5>
            <h5>
                <img src="/img/icon/star.png" alt="" /> 5.0{" "}
                <span> (10 Sessions)</span>{" "}
            </h5>
        </td>
        <td>
            {
                own? (
                    <Card
                        _id={item._id}
                        _oid={item._owner._id}
                        fetchData={fetchData}
                    />
                ):(
                    <Book
                       item={item} 
                       fetchData={fetchData}
                    />
                )
            }
            
        </td>
    </tr>
  );
};

export default Item;