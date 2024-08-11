// java.js

document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, price: 250, name: "จิตวิทยาสายดาร์ก" ,images:"https://image.makewebeasy.net/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/Cover_%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%94%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%81_1.jpg"},
    { id: 2, price: 260, name: "ถึงโมโหก็อย่าสู้กับคนโง่",images:"https://image.makewebeasy.net/makeweb/r_409x409/Z9S9L5BrM/DefaultData/image_6483441__63_.jpg?v=202206091808" },
    { id: 3, price: 175, name: "เมื่อแมวที่บ้านคุณผันตัวมาเป็นไลฟ์โค้ช",images:"https://image.makewebeasy.net/makeweb/r_409x409/Z9S9L5BrM/DefaultData/image_6483441__16_.jpg?v=202206091808" },
    { id: 4, price: 185, name: "ช่างหัวคุณสิครับ!",images:"https://image.makewebeasy.net/makeweb/r_409x409/Z9S9L5BrM/buinessss/%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_Ignore_everybody_%E0%B8%9B%E0%B8%9B_2.jpg?v=202206091808"},
    { id: 5, price: 165, name: "ป่านนี้เขานั่งกินไอติมสบายใจเฉิบไปแล้ว",images:"https://image.makewebeasy.net/makeweb/r_409x409/Z9S9L5BrM/buinessss/%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89%E0%B9%80%E0%B8%82%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B9%88%E0%B8%87%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B9%84%E0%B8%AD%E0%B8%95%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%88%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%9A%E0%B9%84%E0%B8%9B%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7_1.jpg?v=202206091808" },
    { id: 6, price: 250, name: "เมื่อเส้นทางการทำงานโรยไปด้วยเปลือกทุเรียน",images:"https://image.makewebeasy.net/makeweb/r_409x409/Z9S9L5BrM/DefaultData/Cover_how_to_make_work_not_suck_%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3%E0%B8%87%E0%B8%B2%E0%B8%99_%E0%B9%82%E0%B8%A3%E0%B8%A2%E0%B9%84%E0%B8%9B%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B8%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99_1.jpg?v=202206091808" },

    // Add more products here if needed
  ];

  const cart = {};

  products.forEach((product) => {
    const increaseBtn = document.getElementById(`increaseBtn${product.id}`);
    const decreaseBtn = document.getElementById(`decreaseBtn${product.id}`);
    const inputField = document.getElementById(`inputField${product.id}`);

    increaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(inputField.value);
      inputField.value = currentValue + 1;
      cart[product.id] = currentValue + 1;
      updateTotal(); // เรียกใช้ updateTotal() เพื่ออัพเดตราคารวม
    });

    decreaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(inputField.value);
      if (currentValue > 0) {
        inputField.value = currentValue - 1;
        cart[product.id] = currentValue - 1;
        updateTotal();
      } else {
        delete cart[product.id]; // ลบสินค้าที่จำนวนการสั่งซื้อเป็น 0 ออกจากตะกร้า
        updateTotal();
      }
    });
    
  });

  function updateTotal() {
    let grandTotal = 0;
    let billDetails = "";

    let Name = "";
    let quantityNum = "";
    let priceBy = "";
    let priceN = "";
    let names = [];
    let quantities = [];
    let pricePerUnit = [];
    let totalPrices = [];

    for (const productId in cart) {
      const quantity = cart[productId];
      const product = products.find((item) => item.id === parseInt(productId));
      if (product) {
        grandTotal += product.price * quantity;
        billDetails += `ชื่อหนังสือ: ${
          product.name
        }\nจำนวน: ${quantity} เล่ม\nราคา: ${product.price * quantity} บาท\n\n`;

        // สะสมข้อมูลสำหรับแสดงในตาราง
        
        Name += `<td>${product.name}</td>`;
        quantityNum += `<td>${quantity}</td>`;
        priceBy += `<td>${product.price}</td>`;
        priceN += `<td>${product.price * quantity}</td>`;
        names.push(product.name);
        quantities.push(quantity);
        pricePerUnit.push(product.price);
        totalPrices.push(product.price * quantity);
      }
    }
   
    const orderSummaryHTML = Object.keys(cart)
    .filter(productId => productId !== '0') // เพิ่มเงื่อนไขเพื่อไม่รวมสินค้าที่มี productId เป็น 0
    .map(productId => {
      const product = products.find(item => item.id.toString() === productId);
      if (product && cart[productId] > 0) {
        return `
          <tr>
            <td><img src="${product.images}" alt="${product.name}" width="100"></td>
            <td>${product.name}</td>
            <td>${cart[productId]}</td>
            <td>${product.price} บาท</td>
            <td>${product.price * cart[productId]} บาท</td>
          </tr>
        `;
      }
      return '';
    })
    .join('');
  
  

    orderSummaryBody.innerHTML = orderSummaryHTML;
 // อัพเดตราคารวมที่ต้องจ่ายทั้งหมด
 if(grandTotal>1000){
    z=grandTotal
    z*=(10/100)
    sumersell=grandTotal-z
    const grandTotalElement = document.getElementById("grandTotal");
    const summerY =document.getElementById("summerY");
    const Truesome = document.getElementById("Truesome");
    grandTotalElement.textContent = grandTotal;


        summerY.textContent = "-$"+z ;

      
      Truesome.textContent =sumersell;
    
    

}
 else{
     const grandTotalElement = document.getElementById("grandTotal");
     grandTotalElement.textContent = " "+grandTotal+" ";
     Truesome.textContent =grandTotal;
     summerY.textContent ="0"; 
 }

    // Update other HTML elements
    document.getElementById("billDetails").textContent = billDetails;
    document.getElementById("Name").innerHTML = Name;
    document.getElementById("quantityNum").innerHTML = quantityNum;
    document.getElementById("priceBy").innerHTML = priceBy;
    document.getElementById("priceN").innerHTML = priceN;
    document.getElementById("grandTotal").textContent = TotalPriceAll + " บาท";
  }
  

 
});
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeme")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// JavaScript เพื่อแสดง Pop-up
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popup-close");

  // แสดง Pop-up
  popup.style.display = "block";

  // ปิด Pop-up เมื่อคลิกที่ปุ่มปิดหรือพื้นหลังสีดำ
  popupClose.addEventListener("click", function () {
    popup.style.display = "none";
  });

  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});
