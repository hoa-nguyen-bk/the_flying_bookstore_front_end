
### Kịch bản Sprint Planning giữa Huy (PO), Đạt (Scrum Master) và Tín (Tech Lead) trong 10'

---
(chỗ này Hòa mở cái tab Sprints trên azure cho Huy lên bảng nhìn và thống kê lại, hông cần học thuộc văn mẫu vì này đọc trên board rõ lắm ồi: https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_backlogs/backlog/The-Flying-Bookstore%20Team/Stories?showParents=false&System.IterationPath=The-Flying-Bookstore%5CSprint%201%20-%20b%E1%BA%AFt%20%C4%91%E1%BA%A7u)

**Mai Thành Đạt (Scrum Master)**:  
“Chào mọi người, hôm nay chúng ta sẽ bắt đầu Sprint Planning cho sprint mới. Trước tiên, mình muốn chia sẻ về hiệu suất của nhóm trong sprint vừa qua. 

- **Tín** đã hoàn thành user story 'Là khách, tôi xem danh sách tài liệu được đề xuất' với **story point là 8** và hoàn thành trong tổng cộng **12 giờ**.
   - Xây dựng trang Home mất **7 giờ**
   - Xây dựng API để lấy danh sách thể loại (genre) mất  **1 giờ**
   - Xây dựng API để lấy danh sách bài đăng, sách (book), và copy  **4 giờ**
- **Minh** đã làm tốt với user story 'Là khách, tôi có thể đăng ký tài khoản' với **story point là 5** và hoàn thành trong tổng cộng **8 giờ**.
   - Xây dựng trang đăng ký tài khoản.  mất **5 giờ**
   - Xây dựng entity cho user. mất **2 giờ**
   - Xây dựng API đăng ký. mất **1 giờ**

Điều này cho thấy nhóm đã làm việc hiệu quả và quản lý được thời gian khá ok”. Qua đó mình đã tổng hợp lại gantt chart và burndown chart như sau
(mở file gantt chart đồ ra)

**Tôn Trọng Tín (Tech Lead)**:  oki bạn
---

**Mai Thành Đạt (Scrum Master)**:  
“Đúng vậy, dựa vào thông tin trên, bây giờ, chúng ta sẽ lập lịch cho sprint này. Sprint 2 này sẽ diễn ra **2 tuần** tới, và mình cần biết mỗi người sẽ có bao nhiêu thời gian rảnh và lịch rảnh khi nào để phân chia công việc hợp lý.

Bây giờ mình sẽ hỏi từng người nhé. Tín, bạn có thể cho biết bạn dự kiến rảnh bao nhiêu giờ và rảnh thời điểm nào trong tuần tới không?”

(đọc cái bảng: https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_wiki/wikis/The-Flying-Bookstore.wiki/22/Th%E1%BB%91ng-k%C3%AA-th%E1%BB%9Di-gian-r%E1%BA%A3nh-trong-tu%E1%BA%A7n-t%E1%BB%9Bi)

**Tôn Trọng Tín (Tech Lead)**:  
“Mình dự kiến sẽ có khoảng **6 giờ** cho tuần tới, và mình dự định làm vào chiều thứ 7”



**Mai Thành Đạt (Scrum Master)**:  
“Tốt, cảm ơn Tín! Minh, còn Phúc thì sao?”
... tiếp tục trả lời như trên


**Mai Thành Đạt (Scrum Master)**:  
“Tốt lắm! Vậy tóm tắt lại, thời gian rảnh của từng người như sau:  



Dựa trên thông tin này, chúng ta sẽ lên lịch và phân chia công việc cho sprint tiếp theo.”  

--- 

**Kết thúc phần 1 của Sprint Planning**
### Kịch bản Sprint Planning - Phần 2

---
(mở https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_backlogs/backlog/The-Flying-Bookstore%20Team/Stories?showParents=false&System.IterationPath=The-Flying-Bookstore%5CSprint%202%20-%20t%C4%83ng%20t%E1%BB%91c)

**Mai Thành Đạt (Scrum Master)**:  
“Cảm ơn mọi người đã tham gia tích cực. Huy, bạn hãy chia sẻ về Product Backlog ở tuần tới?”

**Đặng Xuân Huy (Product Owner)**:  
“Tuyệt! Chúng ta có ba user story chính trong sprint này:
1. **Là người dùng, tôi đăng nhập** 
2. **Là khách, tôi có thể tìm kiếm tài liệu**
3. **Là khách, tôi có thể xem thông tin chi tiết của tài liệu** 

Bây giờ mình sẽ bắt đầu phân chia task cho từng user story đã được lập sẵn (tức là làm mịn) và mình sẽ chia sẻ ước lượng thời gian cho từng task như sau:

1. **Là người dùng, tôi đăng nhập**   (story point: 3)  
   - Xây dựng trang đăng nhập - thời gian dự kiến là **3 giờ**  
   - Xây dựng API đăng nhập - thời gian dự kiến là **2 giờ**  
   - **Tổng thời gian**  dự kiến là **5 giờ**  

2. **Là khách, tôi có thể tìm kiếm tài liệu**  (story point: 8)  
   - Xây dựng trang danh sách tài liệu: - thời gian dự kiến là **6 giờ**   
   - Tạo API tìm kiếm bài đăng: - thời gian dự kiến là **5 giờ**  
   - **Tổng thời gian**: **11 giờ**  

3. **Là khách, tôi có thể xem thông tin chi tiết của tài liệu**   (story point: 8)  
   - Xem thông tin chi tiết của tài liệu: - thời gian dự kiến là **6 giờ**   
   - Tạo API lấy chi tiết bài đăng: - thời gian dự kiến là **6 giờ**  
   - **Tổng thời gian**: **12 giờ**  


(mở link Sprint-Goal  Sprint 2: https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_wiki/wikis/The-Flying-Bookstore.wiki/24/Sprint-Goal-sprint-2)

Dựa trên các thông tin trên, chúng ta có thể xác định **Sprint Goal** là: “Hoàn thành việc phát triển các trang và API cần thiết cho người dùng để đăng nhập, tìm kiếm tài liệu, và xem thông tin chi tiết của tài liệu trong thời gian quy định.”
Đồng thời mình đã biên soạn sẵn Definition of Done và Definition of Ready cho từng user-story rồi


**Mai Thành Đạt (Scrum Master)**:  
“Nếu mọi người đồng ý với Sprint Goal này, chúng ta có thể bắt đầu phân công công việc cụ thể cho từng task. Mọi người có ý kiến gì không?”
**Tôn Trọng Tín (Tech Lead)**:  đã rõ
Bây giờ, mình muốn hỏi ý kiến của **Tín** về việc mọi người đã nắm rõ các user story và tasks chưa. 


**Tôn Trọng Tín (Tech Lead)**:  đã rõ

**Đặng Xuân Huy (Product Owner)**:  
“Cảm ơn Tín! Mình nghĩ mọi người đã hiểu rõ các user story và tasks được phân chia. Nếu ai có câu hỏi hay ý kiến gì thì hãy chia sẻ nhé!”

**Tôn Trọng Tín (Tech Lead)**:  đã rõ

**Kết thúc phần 2 của Sprint Planning**
### Kịch bản Sprint Planning - Phần 3

---
(mở https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_backlogs/backlog/The-Flying-Bookstore%20Team/Stories?showParents=false&System.IterationPath=The-Flying-Bookstore%5CSprint%202%20-%20t%C4%83ng%20t%E1%BB%91c)

**Mai Thành Đạt (Scrum Master)**:  
“Cảm ơn mọi người đã đồng ý với Sprint Goal. Bây giờ, các bạn dev sẽ chủ động chọn công việc. Ai trong số các bạn muốn xung phong nhận task này?”


**Tôn Trọng Tín (Tech Lead)**:  
“Mình muốn nhận làm user story **Là người dùng, tôi đăng nhập**. Theo ước lượng, việc này sẽ mất khoảng 5 giờ, và mình tự tin có thể hoàn thành nó trong khoảng 100% thời gian đã ước lượng.”


**Mai Thành Đạt (Scrum Master)**:  
“Rất tốt! Vậy là chúng ta đã có 1 người nhận nhiệm vụ đầu tiên. Còn phần **Là khách, tôi có thể xem thông tin chi tiết của tài liệu**  ai muốn nhận?”


**Tôn Trọng Tín (Tech Lead)**:  
“Nhật có thể nhận phần **Là khách, tôi có thể xem thông tin chi tiết của tài liệu** . Theo ước lượng, việc này sẽ tốn khoảng 11 giờ. Nhật tự tin sẽ hoàn thành được 100% trong khoảng thời gian đó.”


**Mai Thành Đạt (Scrum Master)**:  
“Rất tốt! Vậy là chúng ta đã có 2 người nhận nhiệm vụ đầu tiên. Còn phần **Là khách, tôi có thể tìm kiếm tài liệu** ai muốn nhận?”


**Tôn Trọng Tín (Tech Lead)**:  
“Phúc có thể nhận phần **Là khách, tôi có thể tìm kiếm tài liệu**. Theo ước lượng, việc này sẽ tốn khoảng 12 giờ. Phúc tự tin sẽ hoàn thành được 100% trong khoảng thời gian đó.”

---
(mở lại cái bảng: https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_wiki/wikis/The-Flying-Bookstore.wiki/22/Th%E1%BB%91ng-k%C3%AA-th%E1%BB%9Di-gian-r%E1%BA%A3nh-trong-tu%E1%BA%A7n-t%E1%BB%9Bi và bảng https://dev.azure.com/ahihi6174/The-Flying-Bookstore/_backlogs/backlog/The-Flying-Bookstore%20Team/Stories?showParents=false&System.IterationPath=The-Flying-Bookstore%5CSprint%202%20-%20t%C4%83ng%20t%E1%BB%91c)

**Mai Thành Đạt (Scrum Master)**:  
“Rất tốt! Vậy hiện tại chúng ta có ba người cam kết tham gia Sprint này. Để tính toán hiệu suất (performance), chúng ta cần xem xét tổng story points mà mỗi người nhận:

- **Là người dùng, tôi đăng nhập**: Tín - có thể dành 6 giờ, đã cam kết làm 5 giờ - 3 story points  
- **Là khách, tôi có thể xem thông tin chi tiết của tài liệu**: Nhật - có 12 giờ và cam kết làm 11 giờ -  8 Story points
- **Là khách, tôi có thể tìm kiếm tài liệu**: Phúc - có 12 giờ và cam kết làm 12 giờ -  8 story points

Tổng cộng: **story points là 19** cho ba thành viên.

Với 3 người, khối lượng công việc khoảng story points là 19  sẽ phù hợp với khả năng của chúng ta trong sprint này. Như vậy, chúng ta có thể tiếp tục phân công các task khác nếu cần thiết.”

**Tôn Trọng Tín (Tech Lead)**:  đã rõ
---

**Mai Thành Đạt (Scrum Master)**:  
“Rất tốt! Với ba người cam kết tham gia Sprint này, mỗi người có thể dành được bao nhiêu tiếng để họp?

**Tôn Trọng Tín (Tech Lead)**:  tất cả đều đồng ý dành 1 tiếng mỗi tuần để họp

---

**Mai Thành Đạt (Scrum Master)**:  
“Nếu không còn ai muốn nhận thêm, chúng ta sẽ bắt đầu bắt tay vào làm việc nhé!”

--- 

**Kết thúc phần 3 của Sprint Planning**
