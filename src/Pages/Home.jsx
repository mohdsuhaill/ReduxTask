import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
  showProducts,
} from "../Redux/ProductSlice";
import { Row, Col, Card, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
const Home = () => {
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvtuC0-NUexY_WB1sjc4uzoK7gFZf2qkS7w&s",
        "https://cdn.vox-cdn.com/thumbor/0sCYxx6i5MvJQKTh5e9pELHZPzM=/0x0:2040x1360/2040x1360/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/9599227/jbareham_171101_2099_A_0088_02.jpg",
        "https://www.cnet.com/a/img/resize/6e1d5cbd4e3a07363a05a7d3bf7139b07b322a41/hub/2018/09/24/a6a6f9a5-f8ec-4a8c-823b-61f63e94e950/iphone-x-vs-iphone-xs-5005.jpg?auto=webp&fit=crop&height=1200&width=1200"
      ],
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WARvK_sRHtkrgA5rBZu9H7mKJEbHuYLEnA&s",
        "https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_new_glass_full.jpg.og.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLIvBtXIcAvwZ-6KPPpYMZtVxyg-lgJxnPA&s"
      ],
    },
    {
      id: 3,
      title: "Samsung Note 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      images: [
        "data:image/jpeg;base64,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",
        "https://images-cdn.ubuy.co.in/64be82440bd73e51a4318d37-restored-samsung-note-9-128gb-fully.jpg",
        "https://images-cdn.ubuy.co.in/6357148712d47962cf37b2b7-restored-samsung-note-9-128gb-fully.jpg"
      ],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHm74uKAjp_UY-QPZJVRz8J7DrkmoGXVyTvg&s",
        "https://rukminim2.flixcart.com/image/850/1000/kn97te80/mobile/t/i/o/f19-pro-5g-cph2213-oppo-original-imagfz382yuhmggg.jpeg?q=90&crop=false",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUVGBcZGRgXFxcYGBgaFxgWFx4YFhcYHSggGBolGxoaITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi8lHSUtLS0tLSstLS0tLy0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAIFAAEGBwj/xABEEAABAgMECAQEBAQDBwUAAAABAhEAAyEEMUFRBRJhcYGRofAGscHREyIy4UJSYvEUI3KCFZLSM0NTY6KywgcWJHPy/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAQBAwUCBgf/xAAyEQACAgEDAgMHAgYDAAAAAAAAAQIDEQQhMQUSQVFhEyJxgZHR8EKhFSMyUrHhJDND/9oADAMBAAIRAxEAPwDz6UqsdZZZ+tLG6OOQYvdCT3BTlXgfvGfLdDh0RtARLUr8ofpTrHHhRba9/Ln3si407amlhAvVU7k/duUUUs98R3xjQ0cMQz5mPr55n2+QeXfzy8zRu7rrDWoMOxXO9r68SAK+T9QfPvvsvh2+/pjj1GZLhngFiu3y2i9q5dSYRnJy+3TlTgb4fmD7djDd5XqzanMbGub2xu3CsQyyJuzOQRjwrfz+1RQQKWllX98cR7wWyFlFOYL7wXoN2e+5oin6sc9pxvzdoydV/wBrPcdHf/Ej8/8ALLKXh5b9l/qd0Hl9adMKX5NQCF5QYUw4DeN+cNS+9uN2O64YwqtjXaT5G5MzWDY8nwoRyYQ7ZJdXuA+oEM39opxVFUk44i7rR8X2QSbaSogYH8Iz3Z7742a+p/ysNZl+bnjtd0Ptv7oPFb3+HoX0zSEsEsdYkYf6sdwhNeljeEhhmbn4MN1TnFHpDRFoKdZEzVKb9UaxG8g3RWaP00pCvhWkaqj9K6BJ2P8Ah34wtZdfjPAU6PSZxy/U7KVpZVQUDOj1x47zlD1m0mgs7gm5zTaQrzVyig1LseFN7HzMERV9vG7A0+bcKCKo6y2L3eRizptElssfA6lSX3ehxAuG81MV9ss2yuF9Sm7aSRS7KErLa1IuLh7i5HPPbsi3s09M1NL8Ri4o+3fd0h+nUxs24ZjanQ2Ub8x8/uUiDqlnbI/9STsrTCLqzTwsPmAeeFHJ3XdYTtllccxRr6qFN7wvImMWzu/uDjrS/wA4ZES71X8vKlPIRZpSwbCnD0HUxW2CZrEbgfthR8otFD27y3CK5sZoWzYNKcOHDzga/Yt0uEFPq/f3iBPqB37RWXgWbo/PV8u6xl3f9p9MoItNTtfqH4xBYwzduIB7/eIJIEPTPo9PaBAE54nmHvydJgxphc/or3jKCuXKhv5GABdQauRfYwL7BcoxFqNuHmnHhcBBD9vNO/L3gJIamT9AcNqTjEgFHW/bgd+GyNKS+xvdq8FYmJIUAX29H4AUVGmOO7mGx3DCABZaMtvNmw2pzMLTRed5FzXhW43nOHlKx47fze+W6FijLdjtTnkRjEnAAy8OHmnLdhBpJDVxrzAOJzeIgU3vwLa278JxO+IqlYZOLsHcZYGJA8teGdH2jUmJJuNDxhVcQeMg2Cxttq15ijl8o3DswCWqvfYiFmkLLsHD7IwAg1BBEatUo9qUWYGorsUm5J8j0j6tvY73Zw+g0fPrTvpgz16DUHvpD8slu277yEXCxGZzfkd+3u6kJKmMW69+ZyrhDpv9/Y9+UJWynffuMXjmTSWWW1Rc5KK5ZuQfnG/V21enXH7RkxTL77rWAyd3e7vnBNIMCO6Rizl3ybPoWnpVFMa14FnZ7rto2bH2ZwzLHfHruxhGwrpxHMdjZFiE497fueEVMbXBis+ZxpgT6CLHQdgKiVkUwHfbb4UslnM1YljFn3ZbHu3OY7iRYwhISMIb01X6mYvVdV/5R+f2Kz4GqXTQjKKzTGgJNqSQUpRN5IWf/BW26OjmSoWmyHh3BhHmwnT7Eoy54UuUKOR88v8AqH4htjpLLOStIUhQUFYgvzOG4RfWuzomp+HPDgUTMH1o2fqT+kxw2lNCWiwr15BdCqhIJ+Gvaj8i/wBN8KW0eKHqNQ+JF8kdOH/5EbRMILpLbc/tSK/ROmJdoHy0UPqSp3SRe+cWCjecu3OUKbpj20l6FzZbQJgwCqEjNsRnuhe0WUmgFahuOsn1xiqQspUCCxvf37xjqtFzkzUBQ+oXjIjZ3jD8NdGMM2cr9zD1PTH35r4f7EdG/JV6kjZ9Q93z6RaJmi/v7ecVU+UfMeo5XQWzTn6cH++yELeqyb9xfUYr6fFL3n9BxSxX2u9o0Vh7/N7u+URbvu7fED3t72xSup3eha9FX6k0q3e8aULsqe0AXh20SCiO+sM1dUT2nH6FM9C/0smm/l6jvdsgak973HO4xMTBce8Yw9fu8aVdsLFmLyJThKDxJAZl2/lUA+Y2wvNvfEVHMGnAmoHGG1gA9588YWmJ+/lxwvJjs5NS1YYt6FO/AYi+CqmOH6cj74woksBt+xpheDnBEqq1fX3uOXGJRDNty6YjdcYjMS/33N5jIRM39jZ3WI390wO7OOjkgoV7OIO+4wIvhXg91MAcs4KU8mb05XXCIKmJ/Ez7fvAB5PGNBAlokU0jINkY0bMYkZ1iwnWcTKY4GKNU4Ag5Re2ZdAYom3CakhutRsrcJLKK9aSHBoQ3TvukPSTTvv8AfdEtJSaaw49GPecBsyqdO+vM8Nyi1WwUjyur07otcPp8As3vZt784Qnq1q5d+eOEMWhb0F3tTlh5Ywos7s+z6+kKaq/L7I/M9D0Xp/Yvb2Ld8L08/n/gjK+3beXKD25LoSrEAd9IEkB+nry7EHmEmW2Iux73wj4novA1oydhwxuLsfTjFyJvE5YvgG8hHM2ObqqpdXkbx6x2PhuxGYvXVcnqQSCfTnsiyNblLBRdqVTU5Pnw+J0/hjR3w0ayvqVXvvzjoAISlLhuWuNFLCwjy0pOTcnyzS5ULTJMWAjSpcSclQuVASlgUqSFy1fUhVQduw7RFrMkwtMlQAcJ4k8Hu9osqj8tXH+0l7Fj8aP1c4qtG6fOsJVoGotqH8C9oPd8ek6hSdZBYiKXT3hmTbEnVSlE2/U+lKzmg/gX0MUWUpjNV7iVorvN3fKC2G2GSsEXYjAj3pHKC0z7CoonBS5aflchly9ixHQ2e1ImpBQQoEO/vluhCdeNmaMJqZ3AUFpBSXcPTGFFIINKX9KiKjQWkfhnUUWSo/Lv9j5746NSX4V5RmWV9rwDWCEqY+O3mIkQYXIbq3CsHSt25xWQBmRGWr073wWYmlIED1gAJGIJFCKZ9IGTkKQTW7ypFlVs65d0XucWVxmsSNqTtvp0I9oVnAtc+W8j3BwhkwtaJoANdvXyZ7zHotNqY3Rz4+Jk26eUJYW/kKTJlX3nkx33PGS1U73c7sTCU+1ZDY5upTdcRC/8Sp6mvfG8ZQx3pF0Om3T3e3xLwLx4jk9OtwjH29vhjFXrE4nvDOmtGgS2/oWbzG2D2gx/CJf3fsWpS9M+798C1Xzpv34NnCQmqBdzz4+8QnTlPSu8j7xPtEVy6TYuJI85mWkAQnMtKjAoyM3BaRU7x0eiJroTspHP/CJi00NR0xVdhxL6HiR0iE6ySnOkUvxwl0u1a1yp3xzi3sqro5fTCNW0L2lx/cNblWO9JZJJxXiVa+qHdG2Szjw8/iOG1p7D994QvOtSf39+9sKpqO+/2yaF593ff71wi32SBdVtzul+fMs5MzdFgfpOfri/eMcpZp5SaGOjsE8LCnBurufDK92r1iudbjuaem18Lfce0iOjLIZswJALYthgRvN3WPU9HWQSkBIDMOxHPeANHoZS3dVDzFOnrHZGVDtMO2OTG1l7ssx4IEkwzLXASiJpi0UHpS4YRFehUMypkQAwpEAmSYZQqJFMAFVMlQrNkPFzMlQrMlQAU2kLJLnp1J4qzJmgOobFD8adh4R53pnw7aLBM15NUK/CKy1jOWc/0moj1SbKhchklC0iZKVeg+aTgdoiudaZbXY4nn+jNLy7QKUUL0GhEdvoi0lUsOaih9Dy8jHL+I/AoV/8iyqNKuKLTsmAX/1DjAvCem1SpqpNqGopSWSu5KiCGc4G+l18Zeqp9148DRhcpI7xRCt9OkCQGp3xjZDFxxiYIVGUdmkGBKoRw72wRSWMCUcezXu6ACIN2VPZ4mn284E/f9z8Ym9DsB/7hhABInvcYR0hKf5uB96xYqo+8jvbAlpFzXt1i6m11zUkdQl2vJzs0F9/qOd+6Fy9e/1VA3YmH7TLYkNcx4X7uZ8oSWMe/QY4CPQxkpLKHeQ0sjlyy3XNBThtzvzhaUrDu5qE1wFABDSDXvvnyjo6NKI79eeMQbfwiage8u8oiVtR+besAHliUPB0SokiJQjkxDbQSyFljbAwI2ijRzJZWDqDxJM6GzmKfxRLaYFZp4uH9D3SLSzF2hTxQmkpQ/UOYB9Iq07xNF+tWaWUqMOneftsgVqRSJoHXu7bTpBpie8OBx37I0TDKJCmVFtYppBBBa8Vuuu23e8V1rkseMMWUuACftxwGO2Je6LO5rdHU+FdPfAm6q1BANAo/Re4C/yj9WGNLvWdH20L2LDEgtvBGBG24x4Vahrpf8QeuJix8MeKlyCJczWVLFzfXL2y3vTnLNMmjuEsbMnLsefE99MlM0Afj+apUaXkCo+YX7QCNsVkyTqnDMEXEZiE9C6aTNSlQWCFD5JiSdVezNKhik1EXsye6WVWlLmvd7rxW7PnaclYIIlUbKIg0BI1KmQ0hUVyVQxKmQAOEQJcuJIXBBEAIzJUKzJUWykQtNlQAVICkK1kFj0OwwhpfQcq1pISkJmYouB2yzgdn7RdzJUKT5ONxjidamsM7jNxexxFl0tPsJ+FaHXJcATGOsjBlj19aR11ltKZqQuWoKBubZBbXKRPGpPYKZhMZ32TBiNt++OJt+iLTYJmtIfVNTLvSQcZZxGzllGPqNI08r8+w/VcpHcS5gN+2BzJbDhXnFLoXxDKtIwTMAHynPj+8XSJmBvoOW2M5pp4YwLLLddnMmvCJJmggt+rdgexG50rHkaDHMwqiZhv/MeT5UjkCzBrfifKIEU2t5YQKXMff8xzNQMoKk9A0SAjpNON949cbt8VE1BBd/MZuR+IvuEX1tl0dvyn0iknU2v3hU8Wjc0M+6rHkNUvMQKMrj+xuFeJIgyVbLtzDZkO6QsoYMWGwU4BgDBULxoR0GwE0G4B4dyWjV477yyiHFufpQRIHL96ZXmojSlDs4GuyAk80ETSIxQjEwiYhsxsiNxowAWVhmUHKB+JV/LLF1VdABX/ADNx2wGxLq3GAeIJrrQMkk8z9oqqji3BfqJ5oyJG7F+vfrugkpQNMuL3DvhAEKbu/h3leYmlVeXTvg8PmKatKHp++NOfthC8tPLtqY+kPzJYI76dKQBUsj7ZZjLbASmFlqZ/WvPPdFdbpbFw/e6LGSOOTemW+NWmU44OKcwNl5gBPBLw9p2bZ1EoIKS2vLV9C2x/SrJQqNzg+v8AhnxPLny3SolIbWCv9pKf84H1JyWKHFjSPCtXVPeP7dIesVsmSViZLWULTcodQRcRmDQ4xKm4P0NGNavhn9S/c+jdUEOKiBKlxxPg3xmmcRLICJ2Mr8EzMyCblf8ALP8Aa9w7yRNTMS6T7jeIYTT4EpQcXhixTGAwdUuBlMBASWuGJa4SgiFwAWAVEFiApmQR4gAS5cUXiXSibLK1yNZSjqoT+ZW3JIFSeF5AjoZ81KUKWoslIJJyADk8o8e8U6RmTpqp8xJSgBkJ/Ih6A4axNTtpUARDeEdJZM0j4mmJZa5ynUaICUFO2jBTf3Y4x0egPFEucgSpwCkm4P8A9UtXpwIjzJKhMUFzFFKdbVJF6Us6QMnOtXYYxVoKF/y1FY11AFiCtKW1VkC5d/zCu8O9LeSxI9B8SeE/9/IVuWPKaBcf1ed0I6K8TqQoSbUGI/EehcXjaNsb8M+LlIos0uIUMDRli5j+a40uNIvtL6Bk2yWVSh81+o/zDbLOO7zhO7SqS2/2hiu/G0h6RPCwGIIIBBF1W74QO1Sq0v3FRob60jztNqtFgW31S3bFtx/KqO50JpiVakOm8PQ4PnGXZTKG/KG088BJc9qb6EpF+wX97Ie+LrBxidwuEVlqllJetHwSBwzMSkWraOZOBFGGXrFB0WMxToV/T5VintSmJ38K1uvMWSlODto3AHvdFPpFTB/6TtplldGt01+7L5DNC5AhYO7Dk9E3ZjhGytjmR3fhfcBFbItbFr2J6F/9Q4xYBYzDZ8kvyKFc40y/GRhC6Adlq3bwb4y+7y1uu6Fye9u3P5gRxjV+PPmLhlABwpVGgYiBBEphIwwiREVJiaRGzEgClqZQhHTMz+d/an/yMWJRFNpdxMBNxSK7nETXH38nNsv5bj6hQOO7uv7xMF78YBIV8ogpPeMMGeOSFc++6YCJ6tNt/ezzaFpSu/SGHx7rd09YDkwSsONfLfsiWrjfjxF43thsjaCzbP3ffmYkB5uN3t7RBJW2uzDDsG6B6lB3sizXLHD6djG6+B/w/wAr8erHrHM+DR6e8za9Ctu78o77wn46KSlFpWyrkzzUHJNpGP8A9l+b1I4mbJ9uVYXUGiITa4HrqVNYZ9I2O2JmUNFMCzguDcpJFFJOBEGXLjwzwt4tXZmlr1pkh3AB/mSibzJJwzQaHYax7FoXTkuchKgtK0L+mYm5X6VA1QsYpNYbhNSMi2mVb3G1IiMOTEQutMdlZFKoMlUAaJAxAG9KWczJExCfqIoHYEghQBOALNxjxXxNbRMn/BVrS5ctbLdJCta4lSWeguptq4j2+WuKbxV4VkW5PzfJOAZM0ByGuSsfjRsvGBGPMstYRMcJ5Z4xpmwfw60mXM1pc0FSCHcooRrhgDeORoGhaxKDuRrKBBY1cMrDFi1OOENab0HNsc4S58tnqCKomAYoVjtF4xAhzTejrPMCJlk1k6wOtLLlKSG+lRzrTBtsUJblzYja1Ba0/DGoQxoNUAsoLIBuCvlpcSFZ1utGaXmSC7/KMjc1Tq5UrqnhlFZYZYlgg0U4Ncw9DlffmBBZy1zFIlyxrTFFKUilSHIcjAVrlrExZg4yejWkS7XL+cALUKKai9iveOD0LZlSLX/LJ1WcDY5BQTvBHCOv0mpNls6JbupKUpG1gA8UehrOQQoitQ7NVyo34OTFNmnVnpnk6WodaOtWnWTrAPQk0c1b2irWSlW3aQObRbSSCmhB+UAtyffFZpiVeRnl3xjEv08qZ9sh+i6Nqygkq1AB32NUuTrC8wtMqMgdUvwducUJ0oAqpDJ4V1nhuTpVBDVwHIKGezrGxodJKMMpbsb9vTSsWSSbKfSgVLXrDfxLs/D0jdi0rVjdTiLj0MWtrCJqCQQT1csBuji9KLEpTCrHyxhnslnGC2WorhHuclg7WXPo4O/o5/7Vf5on8RB+oKfZhUuOb8Gjz6y6bmA1U1zbGpyi7lafoCTlgMsXyu4RctPLAn/Fqc4kmvXH2FIkI0I2DGYKEkiJwPWjHgAnCukrOFoIH1Co9oYPnAlmOk8MhrOxSWckFjSHh30jSm1iGvY994wx/CUdPLHPjDzpbipR3RmyniXawQ3b4alsRX07wgCRmGzeNgd14xQSGfnE0K9j7xCNHf3hwgAYLXPg3EetIOgONl/+a/fCSV49uLxFlKNzbuBHSKrHsanS4e/KXoJzJHl5faE5tmv49axcvdiKHk6TApskYZYZpOHDyitM2JRKCZKIh7QWnJtlXrSyCFfXLU+pMGShgRgoVEFtEjLaOjg95QjNs9e8ax3GWBeypNYfB7Z4V8VyrQh0EkJ+tCv9pK/q/OjJY4sY6hgoOC4MfNFltEyStMyUtUtaWKVJoR7jMGhj1TwV44TOIlr1Zc8/gulzdskn6F/oNDhlDcLFIx79O63nwO8XLgZEMyJyZgdPEG8HIjCIrlxaLgAYIiZA1JiIMQBvSdglWmUZU5AWg4G8H8yVXpUMxHmGlvC03RyjMQTNkE/URdkmakXHJQodl0epJVBNYEEGoIYg1BBwIxEctEpnh2lrelYSyAkpeuJGRzbOO08JaCFkkqtVoDTVpoDfLQa6v9aqE5UGBfqpPh+yIX8RNnlpUKg6txzANBwjkvEmkjapvwkP8JH1EYm717eIS3BySRXgqtU0zVfSDQYX7ePZh2dKAuwJuD4ZmDplplsBtGZ7d6QC0THFerb7uEWpYFZSyw+ibXVnwz7xEF8QTtRJZJLux2mnlFTo+Y0wNtuHGOmWgLSEqqCwPAtziJU12Y71nAV3TreYM8j0ilQU/DZm0N2G03XX+Stu+HtO2Ay1apcj5iDhiLsxdwjnSsp7qO26w/HC44KZNz3lydDrXKF4YcipL/8ASOcV1vsoWM7hxNTEZFsrTMsDwUOo6wwi+lQSW3lJI6eRixtSRUk4s5WfY1A0rAvgL/KeUXWkdclCJdNcAPvblD4kgUGFM4StsUHjBoVJzWREWkZxNM9OfnARYtvSJfwH6ukZGIj+ZBxaUGr3X30wrxIEbTOSbiTuBN9Ms6RZ/wCMznJ/lsQfl+ElseJrW+Bf4pPdwtL1qJacwpt1BE4j5kZl5CBtSReWxq+NQdzeYga7Qk/iHWLH+PnO+ukksCTLRgCMtphK1ylTFFa1OqgokC7dBiPmTmRX2uYHCgd8NWO2pGPSAzbDtv2QpIlVqY0dLN9vavAR1MN+5l3MnS1Xkb2u3eTQoZyQpncvRgauWoILZ7E/4un37eLSzT5ktCUIUgBJLHUSpXzF3c5YbIstpc98bi8Jxj4lPKtCbgXwa93w3wZU0C995BbOj4t5iHrTpOfrEEoAcFhKS1HIIfeexEFaTnrYKWlRSafy0n8JQ91+qesItY2YxFd3ArJnod9YUrjBza0YKzamVR0pB7YJk1IC1hgXohIrXEYVO+FP8O/Vg933iiTi3yb2mqtph2pBhbEfmvfPH7xv+MRirLA7jhCp0btzw4iMTYH/ABdPzBx1iMRGO+7yX58w67TL/MOR/CfaBTJiLnF1KEOxcEUubyhnRxVKUVIKSVAD5khTVBcAnOmVYcXpGdqgayLmf4aXIokp2XZYmDEfM4crv7UUc2Wk53Eg6qrrwbrqGuyK6aE5gx1Jt08pKSsapBBHw0gEEqCtw+YwGbappSUFaNVQKT/LSKH5TVnEdJx8yuStfMUW3hH/ANQDLKZdqWWDBM+pUlrkzxfMR+r6htF3plj8WWVYGtNSCz0CiCM0kCojwOfopqg9OET0ZbVSSEl1S3qnEZmWTcdlx6xfC1cCF2lmt0j31enbL/xR/lX7QE6cs2E0H+1ftFLoTUtCRMRaEKlqoCJQDFvomJ1nQsXsb8HEXX/tdd4tA3/CTsOeyLsiXBA6es3/ABRyV7Rg8QWb/ijkr2iB8Krd/jhz/wApPvtij8S6EEhHxFztZaqJSEAFR59Ygk34r8WS9T4MmY6lD5iAr5RyvinsFqkS0t8QP81SFF8WIasLWbwtTXmTfnU5+ng19IIvQAYtMuf8N7NtyjtJoonJMJP0vKJ+scQrLIBor16XRcFXjK98LnOUHmeG8lnKib2FMcRBRYJstKUy1pASSyvhpJ+aoqbtkTuc+6IWbTErXHzYig1scqR1Nl03JYOtq/lU1Q5wzHWOYtcy0OfmSBQsJaWob61verwWy2iasjXmj5aj5Efl1fImBNkOMfMe0zbZE2WR8QPqliyqF90cRaigqbWb5mxwAz7pHZ6RsCpiWM0FnNEJFeGwxx+lbFqzCAXcA3ekWwlLg5cV4CLgfix94PZbUQBXPN73HI+cGlaHN6lVyZ4N/hP6rtn3jiWpa4LlRlbkpU+WDrFQfChoDUgQSZaJb1WNjuHGd0E0dLVKKlIIcsDrIBZiC4BOYi4s9unAN/KVtMtqCjfKoBqQtKTk8sYjHtWEcsDExEExJMJDRJ420Y0YIAJCIqVGNGPEkESgmK+0S2W+fnFk9IWtqHS+IrDGnn2zRTfDugEscxu+EWgr6+fpFDIXFpZZvfLvlGyjHkgk6Q4a44HEPAEBt+W7DnD6gOfr73wraUkHW97x9vKK50wk8tFld86/6XgwKJ8/vvviYA209fWAJPTviYKlXd+xudOMdKuC8EErrXu5P6sIRnTLvdAJqWer39Kj1g4XRqOPTLf6RtnPeERKmt/pRMNVdHib+rFTNIfG/wD1e9dsEE16Z9NYAjvfGKQ1+DE8C3lEFJCeGzFJy3QtPRVvjYfq6tdH+rdBFLc48f1A86vyiKi9MW8w/mIiaC+7oEnE4UMRWOnoXpwhC3Tzr54NnT6+q/ZbPyZJKr8j6h+PGBz7OFOwzOytYmhD34ehxPONpVq543egigc55A6Ots+yTPiSSz0Uk/Mhab9WYn8Q6i8ER7F4Q8VJnIDApOrrKlKLqSKfMg/7yXUVvDhwI840Lo34yq/QDXa34Scdu+L60aJAIKCUkEapSSlQIBDgiqKG8Zw3QpNZZidQlXGeI8+J6tabdJlyjOWsBCQ/2AxMeXm3fxk42iYSlN0pH5UioJ2kiKDSlmtMwai5y1IUz1FanIVF3QmK6x2abKuURlU1rq3QxFb7mbOeVhHf2hOsPlIa6m5+jRzekZs1B45bA56jnGWLTahSYBjUuTQsX3nm8XsmYiaM7hcXD1N+y6Oyk4tWnJiTj6bt0Es/iQ01v3F8O6Z0MKqH5X6+cctabMQYjLR12pnY2bTUuZ8pYYv2b4PPsqAHdr++844azWNbhVU8K8BF4qYos5cC7HpHErEi2NTY5M0g1Eh9p3M7Qm7kk/UcadtdElB+8YiTid33ilzbGIwjHgmkg8ftEVu20QRBFCDhzaMPTvvhHJ2CQXYjHN+3g6ZeLPwECWGv6d0giVtABz6DBAIyMhUvJgxqMjIkDZjUajICDbRto1GRKIKzV1VFO2m6H5CrjGRkbdMm4pmPcsSaLKzTHps9cPLjBJqHG/1p5uOcajIvQuyuKWuPY7aJPkPSih3yjIyOTs2mb6HnTh9oMhb99sPeNRkCIaJkA9fQQNaOR8yORPrGRkSCBKvHA86cOsDfr7Ma+2cbjI4kjtPD2DS52d2GV2A94PLs6WCpixLRtI11M76qanlG4yM22iKswuMZN2nW2vTZfOcZ+WfqNnxbIlJ1JMpSkh7/AJU9XKq3kgGkKzfHM43S5ad+uSWwFRmIyMjvIi4pvLFD4xtDsUyi2Gqqm8a1DthZfiuebxK2nVOf9UZGQZYdqBr8Rzfyy7iPpL3v+bt4nJ8VzUl9RN+atmL7BGoyDLDtRaWfxPNnkBFn1moTrnVFfxHVYesWnw6VbWbAY7Ca8dsZGRXOT4O4VxW5W2jNq3ttBe/u+JJVl2P3jUZFZYGSvvvb5wJRFYyMgJJy3FHgqb2zjIyJIMYgtg+O537zgiV9tGRkAH//2Q=="
      ],
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzginDBPZBWdMjhNNSwBP_mKuO3UIY_OQBVg&s",
        "https://i0.wp.com/www.goatrotichronicles.ca/wp-content/uploads/2019/07/Huawei-P30-Pro-Screen-1.jpeg?fit=835%2C1050&ssl=1",
        "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/147530-phones-review-review-huawei-p30-pro-review-image1-towuafzpte.jpg"
      ],
    },
  ];

  const dispatch = useDispatch();
  const List = useSelector((state) => state.prodreducer);

  useEffect(() => {
    dispatch(showProducts(products));
  }, [dispatch]);

  const handleInc = (id, quantity) => {
    dispatch(incrementQuantity({ id }));
  };
  const handleDec = (id, quantity) => {
    dispatch(decrementQuantity({ id }));
  };

  const Remove = (id, quantity) => {
    dispatch(removeProduct({ id }));
  };
  return (
    <section>
      <Container>
        <Row className="gx-4 gy-2 gx-lg-5">
          {List.map((ele, index) => {
            return (
              <div key={index} className=" w-75 mx-auto mb-4 ">
                <Col>
                  <Card>
                    <div className="img">
                    <Carousel>
                      {ele.images.map((ele, i) => {
                        return (
                          <Carousel.Item key={i}>
                            <img src={ele} alt="I phone img" />
                          </Carousel.Item>
                        );
                      })}
                      </Carousel>
                    </div>
                    

                    <Card.Body className="text-center">
                      <Card.Title>{ele.title}</Card.Title>
                      <Card.Text>{ele.description}</Card.Text>
                      <Card.Text>
                        <h4>
                          <strong>${ele.price}</strong>
                        </h4>
                      </Card.Text>
                      <div className="quantity">
                        <span>
                          <button
                            onClick={() => handleDec(ele.id, ele.quantity || 1)}
                          >
                            -
                          </button>
                        </span>
                        <span> {ele.quantity ? ele.quantity : 1} </span>
                        <span>
                          <button
                            onClick={() => handleInc(ele.id, ele.quantity || 1)}
                          >
                            +
                          </button>
                        </span>
                      </div>
                      <div>
                        <br />
                        <hr />
                        <div className="d-flex justify-content-between align-content-center flex-wrap">
                          <h3 className="text-muted">Shipping:</h3>
                          <h3>FREE</h3>
                        </div>
                        <div className="d-flex justify-content-between align-content-center flex-wrap">
                          <h3 className="text-muted">Sub-total: </h3>
                          <h3>${ele.price * ele.quantity || ele.price}.00</h3>
                        </div>
                        <hr />
                        <button
                          className="btn btn-danger"
                          onClick={() => Remove(ele.id, ele.quantity || 1)}
                        >
                          Remove
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Home;
