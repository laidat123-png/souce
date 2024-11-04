const Revenue = require('../models/revenue');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/orders');
// Hàm lấy tổng doanh thu
exports.getTotalRevenue = async (req, res) => {
  try {
    const allRevenues = await Revenue.find({});
    const totalRevenue = allRevenues.reduce((total, record) => total + record.totalAmount, 0);

    res.status(200).json({
      status: 'success',
      totalRevenue,
      totalRecords: allRevenues.length,
      orders: allRevenues, // Trả về danh sách các đơn hàng đã tạo doanh thu
    });
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};


exports.getCountDrashBoard = async (req, res,next)=>{
  try{
      const countUser = await User.countDocuments({});
      const countProduct = await Product.countDocuments({});
      const countOrder = await Order.countDocuments({});
      res.json({  countUser, countProduct, countOrder });

  }catch(err){
      res.json({err:err.message})
  }
}
