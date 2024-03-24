class Customer {
    //สร้างอ็อบเจกต์ลูกค้า โดยรับพารามิเตอร์เกี่ยวกับชื่อ, ที่อยู่, เบอร์โทร, และอีเมลของลูกค้า
    constructor(name, address, phone, email) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accounts = [];
    }

    //ใช้สำหรับการตรวจสอบความถูกต้องของข้อมูลลูกค้า โดยรับพารามิเตอร์เหมือนกับ constructor
    verify(name, address, phone, email) {
            return this.name === name && this.address === address && this.phone === phone && this.email === email;
        }
        // คืนค่าอาร์เรย์ของบัญชีที่เปิดอยู่ของลูกค้า
    getAccounts() {
            return this.accounts;
        }
        //เพิ่มบัญชีลงในอาร์เรย์ของบัญชีที่เปิดอยู่ของลูกค้า
    createAccount(account) {
        this.accounts.push(account);
    }

    toString() {
        return `ชื่อ: ${this.name}\nที่อยู่: ${this.address}\nเบอร์โทร: ${this.phone}\nอีเมลล์: ${this.email}`;
    }
}

class Account {
    //สร้างอ็อบเจกต์บัญชี โดยรับเลขบัญชีและยอดเงินคงเหลือเริ่มต้น
    constructor(accountNumber, balance) {
            this.accountNumber = accountNumber;
            this.balance = balance;
            this.transactions = [];
            this.customer = null;
        }
        //ทำการฝากเงินเข้าบัญชี
    deposit(amount) {
        console.log(`ฝากเงิน ${amount} เข้าไปที่บัญชี ${this.accountNumber}`);
        this.balance += amount;
    }

    //สร้างธุรกรรมและเพิ่มลงในรายการธุรกรรมของบัญชี
    withdraw(amount) {
        if (amount <= this.balance) {
            console.log(`ถอนเงิน ${amount} จากบัญชี ${this.accountNumber}...`);
            this.balance -= amount;
        } else {
            console.error("เงินไม่เพียงพอ");
        }
    }

    createTransaction(transactionId, transactionType, amount, transactionDate, status) {
        console.log(`สร้างธุรกรรม ${transactionId} ประเภท ${transactionType}`);
        const transaction = new Transaction(transactionId, transactionType, amount, transactionDate, status);
        this.transactions.push(transaction);
    }

    //คืนค่ารายการธุรกรรมของบัญชี
    getTransaction() {
        return this.transactions;
    }

    //คืนค่ายอดเงินคงเหลือในบัญชี
    getBalance() {
        return this.balance;
    }

    //คืนค่าลูกค้าที่เกี่ยวข้องกับบัญชี
    getCustomer() {
        return this.customer;
    }

    setCustomer(customer) {
        this.customer = customer;
    }

    getAccountType() {
        return this.accountType;
    }

    setAccountType(accountType) {
        this.accountType = accountType;
    }
}

class Transaction {
    // สร้างอ็อบเจกต์ธุรกรรม โดยรับเลขที่ธุรกรรม, ประเภทธุรกรรม, จำนวนเงิน, วันที่ธุรกรรม, และสถานะ
    constructor(transactionId, transactionType, amount, transactionDate, status) {
        this.transactionId = transactionId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.status = status;
    }

    getTransactionId() {
        return this.transactionId;
    }

    getTransactionType() {
        return this.transactionType;
    }

    getAmount() {
        return this.amount;
    }

    getTransactionDate() {
        return this.transactionDate;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    setTransactionType(transactionType) {
        this.transactionType = transactionType;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    setTransactionDate(transactionDate) {
        this.transactionDate = transactionDate;
    }
}

class CurrentAccount extends Account {
    // สร้างอ็อบเจกต์บัญชีกระแสรายวัน โดยรับพารามิเตอร์เหมือนกับ Account และเพิ่มคุณสมบัติเฉพาะของบัญชีกระแสรายวัน
    constructor(accountNumber, balance, overdraftLimit, overdraftInterest) {
        super(accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
        this.overdraftInterest = overdraftInterest;
    }


    calculateInterest() {
        if (this.balance < 0) {
            const interest = Math.abs(this.balance) * this.overdraftInterest;
            console.log(`คำนวณดอกเบี้ยเงินที่เกิน: ${interest}`);
            return interest;
        } else {
            console.log(`ไม่มีดอกเบี้ยเนื่องจากยอดคงเหลือไม่ติดลบ`);
            return 0;
        }
    }

    //คืนค่าวงเงินที่ยอดคงเหลืออาจติดลบได้
    getOverdraftLimit() {
        return this.overdraftLimit;
    }

    setOverdraftLimit(overdraftLimit) {
        this.overdraftLimit = overdraftLimit;
    }
}

class SavingAccount extends Account {
    //สร้างอ็อบเจกต์บัญชีออมทรัพย์ โดยรับพารามิเตอร์เหมือนกับ
    constructor(accountNumber, balance, interestRate) {
        super(accountNumber, balance);
        this.interestRate = interestRate;
    }

    calculateInterest() {
        const interest = this.balance * this.interestRate;
        console.log(`คำนวณดอกเบี้ย: ${interest}`);
        return interest;
    }

    getInterestRate() {
        return this.interestRate;
    }

    setInterestRate(interestRate) {
        this.interestRate = interestRate;
    }
}

class Bank {
    //รับพารามิเตอร์เกี่ยวกับชื่อ, ที่อยู่, และรหัสธนาคาร
    constructor(name, address, code) {
        this.name = name;
        this.address = address;
        this.code = code;
    }

    manage() {
        console.log("การจัดการของธนาคาร");
    }

    maintain() {
        console.log("ดูแลระบบธนาคาร");
    }

    verify() {
        console.log("ตรวจสอบธนาคาร");
    }

    openAccount() {
        console.log("เปิดบัญชี");
    }

    closeAccount() {
        console.log("ปิดบัญชี");
    }

    createTransaction() {
        console.log("กำลังทำธุรกรรม");
    }

    createCustomer() {
        console.log("กำลังสร้างลูกค้าใหม่");
    }

    createATM() {
        console.log("กำลังสร้้างATM");
    }

    //รับพารามิเตอร์เกี่ยวกับเลขบัญชีและยอดเงินเริ่มต้น และคืนค่าอ็อบเจกต์บัญชีที่ถูกสร้างขึ้น
    createAccount(accountNumber, balance) {
        console.log(`กำลังสร้างบัญชี ${accountNumber}  ${balance}`);
        return new Account(accountNumber, balance);
    }
}

class ATM {
    //รับพารามิเตอร์เกี่ยวกับตำแหน่งและผู้ดูแลจาก ATM
    constructor(location, manageBy) {
        this.location = location;
        this.manageBy = manageBy;
    }

    identify() {
        console.log("กำลังระบุตัวตนผู้ใช้");
    }

    checkBalance(account) {
        console.log(`ตรวจสอบยอดเงินคงเหลือ ${account.accountNumber}`);
        return account.getBalance();
    }

    withdraw(account, amount) {
        console.log(`ถอนเงิน ${amount} จากบัญชี ${account.accountNumber}`);
        account.withdraw(amount);
    }

    deposit(account, amount) {
        console.log(`ฝากเงิน ${amount} ไปยังบัญชี ${account.accountNumber}`);
        account.deposit(amount);
    }

    changePin() {
        console.log("เปลี่ยนรหัส");
    }

    transfer() {
        console.log("");
    }

    verify() {
            console.log("");
        }
        // เมทอดต่าง ๆ ในคลาสนี้ทำหน้าที่เชื่อมโยงกับระบบบัญชีและการทำธุรกรรมของลูกค้าในธนาคาร เช่น ตรวจสอบยอดเงิน, ถอนเงิน, ฝากเงิน และเปลี่ยนรหัส PIN โดยใช้ข้อมูลที่ได้รับมาจากลูกค้าและบัญชีที่กำหนดไว้ในการทำธุรกรรมต่าง ๆ ใน ATM
}



//Display
const main = () => {
    // สร้างธนาคาร

    const bank = new Bank('Krungthai', 'KTB', '242454');

    // สร้างลูกค้าแรก
    const customer1 = new Customer('YanakornS', 'Nakornpathom', '0929999992', 'YankornS@email.com');

    // สร้างลูกค้าที่สอง
    const customer2 = new Customer('Locke', 'Target shooting road', '0289202453', 'JLocke@email.com');

    // สร้างบัญชีให้กับลูกค้าแรก
    const account1 = bank.createAccount("ออมทรัพย์", 50000);



    // สร้างบัญชีให้กับลูกค้าที่สอง
    const account2 = bank.createAccount("ออมทรัพย์", 50000);


    // แสดงข้อมูลลูกค้าแรก
    console.log(customer1.toString());



    // เพิ่มบัญชีให้กับลูกค้าแรก
    customer1.createAccount(account1);


    // การฝากเงิน
    account1.deposit(4000);


    // การถอนเงิน
    account1.withdraw(2000);

    // แสดงยอดเงินคงเหลือ
    console.log(`ยอดเงินคงเหลือ: ${account1.getBalance()}\n----------------------`);


    // แสดงข้อมูลลูกค้าที่สอง
    console.log(customer2.toString());

    // เพิ่มบัญชีให้กับลูกค้าที่สอง
    customer2.createAccount(account2);

    // การฝากเงิน
    account2.deposit(6000);

    // การถอนเงิน
    account2.withdraw(1000);

    // แสดงยอดเงินคงเหลือ
    console.log(`ยอดเงินคงเหลือของลูกค้าที่สอง: ${account2.getBalance()}`);
}
main();