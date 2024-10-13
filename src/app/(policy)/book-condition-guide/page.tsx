
const page = () => {
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-10">Hướng dẫn về tình trạng sách</h1>
      <p className="text-base">
        Nếu bạn là một người yêu sách như chúng tôi, bạn sẽ biết rằng mỗi cuốn sách đều độc đáo — một số mới in, trong khi số khác đã qua thời gian và mang cảm giác ấm áp. Một số cuốn sách đã được đọc vô số lần, trong khi những cuốn khác đang chờ đợi người đọc đầu tiên. Một số cuốn sách có chữ ký của tác giả hoặc từng thuộc về thư viện, trong khi một số khác không có dấu hiệu đặc biệt nào. Những khác biệt này không chỉ ảnh hưởng đến diện mạo và cảm giác của cuốn sách mà còn ảnh hưởng đến giá trị và sự mong muốn của chúng. Hôm nay, chúng tôi sẽ hướng dẫn bạn qua hệ thống phân loại sách của The Flying Bookstore, cung cấp một số mẹo về cách chọn tình trạng sách phù hợp, và giúp bạn tìm thấy những cuốn sách tốt nhất phù hợp với nhu cầu của mình.
      </p>

      <h2 className="text-xl mt-5 font-semibold">Giải thích về tình trạng sách</h2>
      <p className="text-base">
        Để hiểu rõ hệ thống phân loại tình trạng sách, điều quan trọng là phải nắm rõ cách thức hoạt động của hệ thống này. Về cơ bản, xếp hạng được xác định dựa trên tình trạng tổng thể và hình thức của cuốn sách, bao gồm các yếu tố như bất kỳ hư hỏng, dấu vết, hoặc các tài liệu bổ sung nào có thể đi kèm. Điều này rất quan trọng vì chúng có thể ảnh hưởng đáng kể đến giá trị của cuốn sách, đặc biệt nếu đó là một vật phẩm có tính sưu tầm (càng quan trọng hơn đối với sách có thiết kế bìa nghệ thuật hoặc hiếm).
      </p>

      <p className="text-base">Không có tiêu chuẩn chung nào cho việc phân loại tình trạng sách, nhưng hầu hết các nhà bán sách đều sử dụng một số thuật ngữ sau:</p>

      <ul>
        <li><strong>Mới - hư hại 0%:</strong> Cuốn sách chưa từng được đọc và trông giống như vừa xuất xưởng từ nhà xuất bản.</li>
        <li><strong>Như mới - hư hại 10%:</strong> Sách có tình trạng giống hệt như khi được xuất bản. Không có khuyết điểm, không có dấu hiệu hao mòn hay hư hại. Có thể có hoặc không có bìa áo, tùy thuộc vào cách cuốn sách được in ban đầu. Các vật liệu đi kèm như bìa cứng, mã truy cập, đồ chơi có thể bị thiếu nếu không có ghi chú đặc biệt trong mô tả.</li>
        <li><strong>Rất tốt - hư hại 20%:</strong> Cuốn sách gần như mới nhưng có thể có một số khuyết điểm nhỏ, chẳng hạn như mờ nhạt nhẹ ở bìa hoặc gáy. Không có rách, vết bẩn hoặc dấu vết.</li>
        <li><strong>Tốt - hư hại 30%:</strong> Sách có một số dấu hiệu hao mòn, nhưng vẫn ở tình trạng tốt. Có thể có một số khuyết điểm nhỏ như vết rách nhỏ, vết nhăn, hoặc dấu vết trên bìa, gáy hoặc trang sách.</li>
        <li><strong>Chấp nhận được - hư hại hơn 30%:</strong> Sách đã qua sử dụng khá nhiều, với những dấu hiệu hao mòn rõ rệt như trầy xước, vết lõm và các góc bị mòn. Tuy nhiên, nội dung vẫn có thể đọc được, và không có trang nào bị thiếu.</li>
      </ul>

      <h2 className="text-xl mt-5 font-semibold">Tình trạng sách và giá cả</h2>
      <p className="text-base">
        Tại The Flying Bookstore, chúng tôi cung cấp các mô tả rõ ràng và chính xác về tình trạng sách để giúp khách hàng tìm thấy đúng thứ họ cần. Tình trạng sách và giá cả thường có liên quan chặt chẽ, sách ở tình trạng tốt hơn sẽ có giá cao hơn. Khi chọn mua sách, hãy lưu ý đến mục đích sử dụng, ngân sách và độ tin cậy của người bán.
      </p>
    </div>
  );
};

export default page;
