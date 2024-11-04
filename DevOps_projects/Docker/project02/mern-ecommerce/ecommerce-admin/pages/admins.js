import Layout from "@/components/Layout";
import Spinners from "@/components/Spinners";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import { dateFormatter } from "@/lib/date";


function AdminsPage({ swal }) {
    /** application states */
    const [email, setEmail] = useState('')
    const [adminEmails, setAdminEmail] = useState([])
    const [isAdminsLoading, setIsAdminsLoading] = useState(false)


    /** a functionality to add an admin */
    function addAdmin(e) {
        e.preventDefault()
        axios.post('/api/admins', { email }).then(() => {
            swal.fire({
                title: 'Admin created!',
                icon: 'success'
            })
            setEmail('')
            loadAdmins()
        }).catch((err) => {

            swal.fire({
                title: `Error`,
                text: err.response.data.message,
                icon: 'error'
            })

        })
    }

    /** fetch all the admin
    * and update the state with the
    * the data returned
    */
    const loadAdmins = () => {
        setIsAdminsLoading(true)
        axios.get('/api/admins').then((res) => {
            setAdminEmail(res.data)
            setIsAdminsLoading(false)
        })
    }

    const deleteAdmin = (_id, email) => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${email}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                axios.delete(`/api/admins?_id=${_id}`).then(() => {
                    swal.fire({
                        title: 'Admin deleted!',
                        icon: 'success'
                    })
                })
                loadAdmins()
            }

        })



    }

    useEffect(() => {
        loadAdmins();
    }, [])

    return (
        <Layout>
            <h1>Admin</h1>
            <h2>Add new admin</h2>
            <form onSubmit={addAdmin}>
                <div className="flex gap-2 whitespace-nowrap">
                    <input type="email"
                        className="mb-0"
                        placeholder="google email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        Add admin
                    </button>
                </div>
            </form>
            <h2>Existing Admins</h2>
            <table className="basic">
                <thead>
                    <tr>
                        <th className="text-left">Admin google email</th>
                        <th className="whitespace-nowrap">created At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* spinners */}
                    {
                        isAdminsLoading && (
                            <tr>
                                <td colSpan={2}>
                                    <div className="py-1">
                                        <Spinners />
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {/* map through the admin emails (render --> td) */}
                    {
                        adminEmails.length > 0 && adminEmails.map((adminEmails) => (
                            <tr key={adminEmails._id}>
                                <td>
                                    {adminEmails.email}
                                </td>
                                <td>
                                    {dateFormatter(adminEmails.createdAt)}
                                </td>
                                <td>
                                    <button
                                        className="btn-red"
                                        onClick={() => deleteAdmin(adminEmails._id, adminEmails.email)}
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({ swal }) => (
    <AdminsPage swal={swal} />
));


