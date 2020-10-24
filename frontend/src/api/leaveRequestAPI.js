import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/leaveRequests/request', data);

    updateApprove = data => this.post('/leaveRequests/updateApprove', data);

    getAllLeaveRequests = () => this.get('/leaveRequests/admin/findAll');

    getLeaveRequestById = id => this.get(`/leaveRequests/getById?id=${id}`);

    deleteLeaveRequest = id => this.post('/leaveRequests/delete', id);
}

export default new LeaveRequestAPI();