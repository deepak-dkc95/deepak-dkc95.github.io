---
layout: project
title: "Vendor SLA Tracking & Reporting System"
description: "Django-based web application for tracking vendor downtime incidents, calculating SLA compliance, and generating comprehensive reports with interactive dashboards."
date: 2024-09-15
technologies:
  - Django 4.2
  - Python 3.11
  - PostgreSQL
  - Celery
  - Redis
  - Chart.js
  - Bootstrap 5
  - REST API
highlights:
  - Centralized vendor downtime tracking
  - Automated SLA calculation and compliance scoring
  - Interactive dashboards with real-time metrics
  - PDF report generation with custom templates
  - Role-based access control
  - Automated email notifications for SLA breaches
---

## Project Overview

The Vendor SLA Tracking & Reporting System is a comprehensive Django web application designed to streamline the management of vendor downtime incidents, track Service Level Agreement (SLA) compliance, and generate detailed reports for stakeholders. The system provides a user-friendly submission form for recording vendor outages and an intuitive dashboard for monitoring performance metrics.

### Problem Statement

Organizations managing multiple vendors face challenges:
- Manual tracking of vendor downtimes in spreadsheets
- Inconsistent data entry across teams
- Difficulty calculating SLA compliance accurately
- Time-consuming manual report generation
- Lack of real-time visibility into vendor performance
- No centralized repository for historical incident data

### Solution

A centralized web application that:
1. **Captures** vendor downtime incidents through a structured form
2. **Calculates** SLA compliance automatically based on contracted terms
3. **Visualizes** vendor performance through interactive dashboards
4. **Generates** professional reports for management and vendors
5. **Alerts** stakeholders when SLA thresholds are breached

## System Architecture

```
┌──────────────────────────────────────────────┐
│            User Interface Layer               │
│  ┌────────────┐  ┌──────────────┐           │
│  │ Submission │  │  Dashboard   │           │
│  │   Form     │  │   & Reports  │           │
│  └────────────┘  └──────────────┘           │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│         Django Application Layer             │
│  ┌────────────┐  ┌──────────────┐           │
│  │   Views    │  │   REST API   │           │
│  │  (MVT)     │  │  Endpoints   │           │
│  └────────────┘  └──────────────┘           │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│            Business Logic Layer              │
│  ┌────────────┐  ┌──────────────┐           │
│  │    SLA     │  │   Report     │           │
│  │ Calculator │  │  Generator   │           │
│  └────────────┘  └──────────────┘           │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│              Data Layer                      │
│         ┌──────────────┐                     │
│         │  PostgreSQL  │                     │
│         │   Database   │                     │
│         └──────────────┘                     │
└──────────────────────────────────────────────┘

        ┌──────────────┐
        │    Redis     │
        │ (Cache/Queue)│
        └──────────────┘
```

## Core Features

### 1. Downtime Submission Form

A comprehensive form to capture all relevant incident details:

**Form Fields:**
- Vendor Selection (dropdown)
- Service/Component Affected
- Incident Start Date/Time
- Incident End Date/Time (or mark as ongoing)
- Severity Level (Critical/High/Medium/Low)
- Impact Description
- Root Cause (if known)
- Affected Users Count
- Submitted By (auto-filled)
- Vendor Ticket Reference

**Form Validation:**
- End time must be after start time
- Duplicate incident detection
- Required field validation
- Date/time format validation

```python
# Example Django Form
class DowntimeSubmissionForm(forms.ModelForm):
    class Meta:
        model = VendorDowntime
        fields = [
            'vendor', 'service', 'start_time',
            'end_time', 'severity', 'description',
            'root_cause', 'affected_users'
        ]

    def clean(self):
        cleaned_data = super().clean()
        start = cleaned_data.get('start_time')
        end = cleaned_data.get('end_time')

        if end and start and end <= start:
            raise ValidationError(
                "End time must be after start time"
            )
        return cleaned_data
```

### 2. Automated SLA Calculation

**SLA Calculation Logic:**

```python
def calculate_sla_compliance(vendor, period):
    """
    Calculate SLA compliance percentage

    SLA % = ((Total Period - Total Downtime) / Total Period) × 100
    """
    total_minutes = period_in_minutes(period)
    downtime_minutes = get_total_downtime(vendor, period)

    uptime_minutes = total_minutes - downtime_minutes
    sla_percentage = (uptime_minutes / total_minutes) * 100

    # Check against contracted SLA
    contracted_sla = vendor.contracted_sla  # e.g., 99.9%
    is_compliant = sla_percentage >= contracted_sla

    return {
        'sla_percentage': round(sla_percentage, 2),
        'is_compliant': is_compliant,
        'downtime_minutes': downtime_minutes,
        'allowed_downtime': calculate_allowed_downtime(
            contracted_sla, total_minutes
        ),
        'breach_minutes': max(0, downtime_minutes - allowed_downtime)
    }
```

**SLA Tiers Supported:**
- 99.9% (43.2 min/month)
- 99.95% (21.6 min/month)
- 99.99% (4.32 min/month)
- Custom percentages

### 3. Interactive Dashboard

**Dashboard Components:**

#### A. Overview Metrics (Top Cards)
- Total Vendors Monitored
- Active Incidents
- SLA Compliance Rate (Current Month)
- Total Downtime (Current Month)

#### B. Vendor Performance Table
| Vendor | SLA Target | Actual SLA | Compliance | Incidents | Total Downtime |
|--------|------------|------------|------------|-----------|----------------|
| AWS    | 99.9%      | 99.92%     | ✅ Pass    | 3         | 35 min         |
| Azure  | 99.95%     | 99.88%     | ❌ Breach  | 5         | 52 min         |

#### C. Charts & Visualizations
- **SLA Trend Chart**: Line chart showing SLA% over time
- **Downtime by Vendor**: Bar chart comparing vendors
- **Incident Distribution**: Pie chart by severity
- **Monthly Comparison**: Year-over-year comparison

#### D. Recent Incidents Timeline
```
┌─────────────────────────────────────────┐
│ Dec 14, 2024 14:30 - 15:45 (75 min)   │
│ AWS - EC2 Service Degradation          │
│ Severity: High | Compliance: Breached  │
└─────────────────────────────────────────┘
```

### 4. Report Generation

**Report Types:**

#### Monthly Vendor Report
- Executive Summary
- SLA Compliance Status
- Incident Breakdown
- Trend Analysis
- Recommendations

#### Quarterly Business Review
- Multi-vendor comparison
- Cost impact analysis
- Service reliability trends
- Action items

**Export Formats:**
- PDF (formatted with company branding)
- Excel (with raw data)
- CSV (for external processing)

**Sample Report Generation:**
```python
def generate_monthly_report(vendor_id, month, year):
    """Generate PDF report for vendor"""
    vendor = Vendor.objects.get(id=vendor_id)
    incidents = VendorDowntime.objects.filter(
        vendor=vendor,
        start_time__month=month,
        start_time__year=year
    )

    context = {
        'vendor': vendor,
        'incidents': incidents,
        'sla_data': calculate_sla_compliance(vendor, period),
        'charts': generate_chart_data(incidents),
        'recommendations': analyze_patterns(incidents)
    }

    return render_to_pdf('reports/monthly.html', context)
```

## Workflow Diagram

```
┌─────────────────┐
│  User Submits   │
│ Downtime Form   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Validation    │
│   & Storage     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ SLA Calculator  │─────>│ Check if SLA │
│   (Celery Task) │      │   Breached   │
└─────────────────┘      └──────┬───────┘
                                │
                     ┌──────────┴──────────┐
                     │ Yes                 │ No
                     ▼                     ▼
              ┌──────────────┐      ┌─────────────┐
              │ Send Alert   │      │  Update     │
              │ Notification │      │  Dashboard  │
              └──────────────┘      └─────────────┘
                     │                     │
                     └──────────┬──────────┘
                                ▼
                         ┌──────────────┐
                         │   Dashboard  │
                         │    Updated   │
                         └──────────────┘
```

## Database Schema

### Core Models

```python
class Vendor(models.Model):
    name = models.CharField(max_length=100)
    contracted_sla = models.DecimalField(max_digits=5, decimal_places=2)
    contact_email = models.EmailField()
    contract_start = models.DateField()
    contract_end = models.DateField()
    is_active = models.BooleanField(default=True)

class VendorDowntime(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    service = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    description = models.TextField()
    root_cause = models.TextField(blank=True)
    affected_users = models.IntegerField(default=0)
    vendor_ticket = models.CharField(max_length=50, blank=True)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

class SLAReport(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    period_start = models.DateField()
    period_end = models.DateField()
    sla_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    is_compliant = models.BooleanField()
    total_downtime_minutes = models.IntegerField()
    report_file = models.FileField(upload_to='reports/')
    generated_at = models.DateTimeField(auto_now_add=True)
```

## Technical Implementation

### Technology Stack
- **Framework**: Django 4.2
- **Database**: PostgreSQL 14
- **Cache/Queue**: Redis 7
- **Task Queue**: Celery
- **Frontend**: Bootstrap 5, Chart.js, jQuery
- **PDF Generation**: WeasyPrint
- **Deployment**: Docker, Gunicorn, Nginx

### Key Features Implementation

#### Real-Time Dashboard Updates
```javascript
// Auto-refresh dashboard every 30 seconds
setInterval(function() {
    fetch('/api/dashboard/metrics/')
        .then(response => response.json())
        .then(data => updateDashboard(data));
}, 30000);
```

#### Email Notifications
```python
@shared_task
def send_sla_breach_alert(downtime_id):
    downtime = VendorDowntime.objects.get(id=downtime_id)
    send_mail(
        subject=f'SLA Breach Alert: {downtime.vendor.name}',
        message=f'Vendor {downtime.vendor.name} has breached SLA...',
        recipient_list=['management@company.com'],
    )
```

## Results & Impact

### Metrics
- **Data Entry Time**: Reduced from 10 min to 2 min per incident
- **Report Generation**: From 4 hours to 30 seconds
- **SLA Calculation Accuracy**: 100% (vs. 85% manual)
- **Users**: 45 team members across 3 departments
- **Vendors Tracked**: 25 vendors, 150+ services

### Business Value
- Improved vendor accountability
- Data-driven contract negotiations
- Faster incident response
- Better visibility for management
- Audit-ready compliance tracking

## Future Enhancements
- [ ] Mobile app for on-the-go submissions
- [ ] Predictive analytics for vendor performance
- [ ] Integration with monitoring tools (Datadog, New Relic)
- [ ] Automated root cause analysis using AI
- [ ] Multi-tenant support for MSP use cases
