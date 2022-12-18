import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { updateData } from "../../__lib__/helpers/HttpService";

const Book = ({ item, fetchData }) => {
    const { user } = useSelector(state=>state);
    const { __u__ } = user;

    const handleBook = (_id) => {
        console.log(__u__.info);
        updateData(
            `/session?_id=${_id}&status=BOOK&_participator=${__u__.info._id}`,
            {},
            __u__.token
        ).then((res) => {
            if (res.success) {
            toast.success(res.message);
            fetchData();
            }
        });
    };

    return (
        <button
            onClick={() => handleBook(item._id)}
            className="book-b"
        >
            Book
        </button>
    );
};

export default Book;