<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Contact Request</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f7fb;
      color: #333;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(to right, #1d4ed8, #3b82f6);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header img {
      max-width: 80px;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      font-weight: bold;
    }
    .content {
      padding: 20px 30px;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      color: #1d4ed8;
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .value {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 20px 0;
    }
    .footer {
      background-color: #f4f7fb;
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header with Logo and Company Name -->
    <div class="header">
      <img src="https://nadiscapital.com/images/nadislogo.png " alt="Nadis Capital Logo" />
      <h1>Nadis Capital</h1>
      <p>Investment Management Firm</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <div class="section">
        <span class="label">Name : </span>
        <span class="value">{{name}}</span>
      </div>

      <div class="section">
        <span class="label">Email : </span>
        <span class="value">{{email}}</span>
      </div>

      <div class="section">
        <span class="label">Phone Number : </span>
        <span class="value">{{phone}}</span>
      </div>

      <div class="section">
        <span class="label">Service Interested In : </span>
        <span class="value">{{service}}</span>
      </div>

      <div class="section">
        <span class="label">Message : </span>
        <span class="value">{{message}}</span>
      </div>

      <div class="divider"></div>

      <div class="section text-center">
        <em>This message was sent via Nadis Capital’s contact form.</em>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2025 Nadis Capital. All rights reserved.<br />
      Nairobi, Kenya | info@nadiscapital.com
    </div>
  </div>
</body>
</html>