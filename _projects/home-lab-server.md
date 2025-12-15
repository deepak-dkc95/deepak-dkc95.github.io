---
layout: project
title: "Headless Home Lab Server"
description: "Repurposed old laptop into a fully-functional headless home server with remote access via Tailscale, cloud storage integration, Samba file sharing, and comprehensive monitoring using Prometheus and Grafana."
date: 2024-07-15
technologies:
  - Ubuntu Server 22.04
  - Tailscale
  - Samba
  - Postfix (SMTP)
  - Prometheus
  - Node Exporter
  - Grafana
  - Docker
  - Systemd
highlights:
  - Zero-cost home server using recycled hardware
  - Secure remote access from anywhere via Tailscale VPN
  - Cross-platform file sharing with Samba
  - Real-time system monitoring and alerting
  - Automated email notifications for critical events
  - Energy-efficient 24/7 operation (~15W power consumption)
---

## Project Overview

This project demonstrates how to transform an old, unused laptop into a powerful headless home server with enterprise-grade features. The server provides secure remote access, file sharing, cloud storage integration, and comprehensive monitoring—all without spending money on new hardware.

### Problem Statement

Common challenges faced by home users and hobbyists:
- **Hardware Waste**: Old laptops collecting dust
- **Expensive NAS**: Commercial NAS devices cost $300-$1000+
- **Cloud Storage Costs**: Monthly subscriptions add up ($10-20/month)
- **Remote Access Complexity**: Port forwarding and dynamic DNS headaches
- **No Visibility**: Can't monitor server health remotely
- **Security Concerns**: Opening ports to the internet

### Solution

A comprehensive home server solution that:
1. **Runs headless** - No monitor, keyboard, or GUI needed
2. **Provides secure remote access** - Via Tailscale mesh VPN
3. **Shares files** - Cross-platform with Samba
4. **Monitors health** - Prometheus + Grafana dashboards
5. **Sends alerts** - Email notifications via SMTP
6. **Syncs with cloud** - Integrates with cloud storage
7. **Operates efficiently** - Low power consumption 24/7

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│           External Access (Anywhere)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   Phone      │  │   Laptop     │  │  Desktop │ │
│  │ (Tailscale)  │  │ (Tailscale)  │  │(Tailscale│ │
│  └──────┬───────┘  └──────┬───────┘  └────┬─────┘ │
└─────────┼──────────────────┼───────────────┼───────┘
          │                  │               │
          └──────────────────┴───────────────┘
                             │
                   ┌─────────▼──────────┐
                   │  Tailscale Mesh    │
                   │  VPN (100.x.x.x)   │
                   └─────────┬──────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
┌─────────▼──────────────────────────────────────────┐
│         Old Laptop (Headless Server)               │
│  ┌──────────────────────────────────────────┐    │
│  │      Ubuntu Server 22.04 LTS             │    │
│  └──────────────────────────────────────────┘    │
│                                                    │
│  Services Running:                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │  Tailscale │  │   Samba    │  │  Postfix   │  │
│  │    (VPN)   │  │(File Share)│  │  (Email)   │  │
│  └────────────┘  └────────────┘  └────────────┘  │
│                                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ Prometheus │  │    Node    │  │  Grafana   │  │
│  │(Monitoring)│  │  Exporter  │  │(Dashboard) │  │
│  └────────────┘  └────────────┘  └────────────┘  │
│                                                    │
│  Storage:                                          │
│  ┌────────────┐  ┌────────────┐                  │
│  │ 500GB SSD  │  │  Cloud Sync│                  │
│  │(Internal)  │  │  (rclone)  │                  │
│  └────────────┘  └────────────┘                  │
└────────────────────────────────────────────────────┘
```

## Hardware Setup

### Laptop Specifications
- **Model**: Dell Latitude E6430 (2012, repurposed)
- **CPU**: Intel Core i5-3320M (2.6 GHz)
- **RAM**: 8GB DDR3
- **Storage**: 500GB SSD (upgraded from HDD)
- **Network**: Gigabit Ethernet
- **Power**: ~15W average consumption

### Physical Modifications

**1. Lid Close Behavior**
```bash
# Configure laptop to NOT sleep when lid is closed
sudo nano /etc/systemd/logind.conf

# Set these values:
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore

# Restart service
sudo systemctl restart systemd-logind
```

**2. Cooling Setup**
- Elevated using laptop stand for airflow
- Removed battery (optional, reduces heat)
- Configured fan control for optimal temps

**3. UPS Integration**
- Connected to APC Back-UPS (optional)
- Configured graceful shutdown on low battery

## Software Installation & Configuration

### 1. Ubuntu Server Installation

**Installation Steps:**
```bash
# 1. Download Ubuntu Server 22.04 LTS ISO
# 2. Create bootable USB using Rufus/balenaEtcher
# 3. Install with minimal configuration:
#    - No GUI
#    - OpenSSH server enabled
#    - Static IP: 192.168.1.100
```

**Initial Setup:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y \
    curl wget git htop vim \
    net-tools ufw fail2ban

# Configure firewall
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 139/tcp   # Samba
sudo ufw allow 445/tcp   # Samba
sudo ufw enable
```

### 2. Tailscale VPN Setup

**Why Tailscale?**
- No port forwarding required
- Encrypted mesh VPN
- Works behind NAT/firewalls
- Easy device management
- Free for personal use (up to 100 devices)

**Installation:**
```bash
# Add Tailscale repository
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.noarmor.gpg | \
    sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.tailscale-list | \
    sudo tee /etc/apt/sources.list.d/tailscale.list

# Install
sudo apt update
sudo apt install -y tailscale

# Start and authenticate
sudo tailscale up

# Enable IP forwarding (optional, for subnet routing)
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

**Configure as Exit Node (Optional):**
```bash
# Allow server to route traffic for other devices
sudo tailscale up --advertise-routes=192.168.1.0/24 --accept-routes
```

**Access from anywhere:**
```
Server Tailscale IP: 100.64.1.5
SSH: ssh user@100.64.1.5
Files: \\100.64.1.5\share
```

### 3. Samba File Server

**Installation:**
```bash
sudo apt install -y samba samba-common-bin
```

**Configuration (`/etc/samba/smb.conf`):**
```ini
[global]
   workgroup = WORKGROUP
   server string = Home Lab Server
   security = user
   map to guest = Bad User
   dns proxy = no

# Shared folder for general use
[shared]
   path = /srv/samba/shared
   browseable = yes
   writable = yes
   guest ok = no
   valid users = @sambausers
   create mask = 0664
   directory mask = 0775

# Personal folder
[homes]
   path = /srv/samba/homes/%S
   browseable = no
   writable = yes
   valid users = %S
   create mask = 0600
   directory mask = 0700

# Media folder (read-only for guests)
[media]
   path = /srv/samba/media
   browseable = yes
   read only = yes
   guest ok = yes
```

**Setup:**
```bash
# Create directories
sudo mkdir -p /srv/samba/{shared,homes,media}

# Create Samba group
sudo groupadd sambausers

# Add user to Samba
sudo useradd -M -s /usr/sbin/nologin smbuser
sudo usermod -aG sambausers smbuser
sudo smbpasswd -a smbuser  # Set password

# Set permissions
sudo chown -R root:sambausers /srv/samba/shared
sudo chmod -R 2775 /srv/samba/shared

# Restart Samba
sudo systemctl restart smbd nmbd
sudo systemctl enable smbd nmbd
```

**Access from clients:**
```
Windows: \\100.64.1.5\shared
macOS: smb://100.64.1.5/shared
Linux: smb://100.64.1.5/shared
```

### 4. SMTP Email Notifications

**Install Postfix:**
```bash
sudo apt install -y postfix mailutils

# Select "Internet Site" during installation
```

**Configure Postfix (`/etc/postfix/main.cf`):**
```
# Use Gmail SMTP relay
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_security_level = encrypt
```

**Setup Gmail App Password:**
```bash
# Create password file
sudo nano /etc/postfix/sasl_passwd

# Add line:
[smtp.gmail.com]:587 your-email@gmail.com:app-password

# Secure and hash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd

# Restart Postfix
sudo systemctl restart postfix
```

**Test Email:**
```bash
echo "Test from Home Server" | mail -s "Test Email" your-email@gmail.com
```

**Create Alert Script (`/usr/local/bin/send-alert.sh`):**
```bash
#!/bin/bash
# Send email alert

SUBJECT="$1"
MESSAGE="$2"
TO="admin@example.com"

echo "$MESSAGE" | mail -s "Home Server Alert: $SUBJECT" "$TO"
```

### 5. Prometheus Monitoring

**Install Prometheus:**
```bash
# Create user
sudo useradd --no-create-home --shell /bin/false prometheus

# Download and install
cd /tmp
wget https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz
tar -xvf prometheus-2.45.0.linux-amd64.tar.gz
sudo cp prometheus-2.45.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.45.0.linux-amd64/promtool /usr/local/bin/
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

# Create directories
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```

**Configuration (`/etc/prometheus/prometheus.yml`):**
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

rule_files:
  - "/etc/prometheus/alert_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```

**Systemd Service (`/etc/systemd/system/prometheus.service`):**
```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

**Start Prometheus:**
```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

### 6. Node Exporter

**Install:**
```bash
cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.0/node_exporter-1.6.0.linux-amd64.tar.gz
tar -xvf node_exporter-1.6.0.linux-amd64.tar.gz
sudo cp node_exporter-1.6.0.linux-amd64/node_exporter /usr/local/bin/
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

**Systemd Service (`/etc/systemd/system/node_exporter.service`):**
```ini
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

**Start Node Exporter:**
```bash
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

**Metrics Available:**
- CPU usage
- Memory usage
- Disk I/O
- Network traffic
- System load
- Filesystem usage
- Temperature sensors

### 7. Grafana Dashboards

**Install:**
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt update
sudo apt install -y grafana

sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

**Access Grafana:**
```
URL: http://100.64.1.5:3000
Default: admin/admin (change on first login)
```

**Configure Data Source:**
1. Settings → Data Sources → Add Prometheus
2. URL: `http://localhost:9090`
3. Save & Test

**Import Dashboard:**
- Node Exporter Full (ID: 1860)
- System Metrics (Custom)

**Custom Dashboard Panels:**
```
- CPU Temperature
- Disk Space Used
- Network Traffic In/Out
- Memory Available
- System Uptime
- Service Status
```

### 8. Cloud Storage Integration (rclone)

**Install rclone:**
```bash
curl https://rclone.org/install.sh | sudo bash
```

**Configure:**
```bash
rclone config

# Add Google Drive, Dropbox, or other cloud provider
# Choose: n (new remote)
# Name: gdrive
# Storage: drive (Google Drive)
# Follow authentication steps
```

**Sync Script (`/usr/local/bin/cloud-sync.sh`):**
```bash
#!/bin/bash
# Sync local files to cloud

SOURCE="/srv/samba/shared"
DEST="gdrive:HomeServer/Backup"
LOGFILE="/var/log/cloud-sync.log"

echo "$(date): Starting sync..." >> $LOGFILE

rclone sync $SOURCE $DEST \
    --progress \
    --transfers 4 \
    --checkers 8 \
    --log-file=$LOGFILE \
    --exclude "*.tmp" \
    --exclude ".DS_Store"

if [ $? -eq 0 ]; then
    echo "$(date): Sync completed successfully" >> $LOGFILE
    /usr/local/bin/send-alert.sh "Cloud Sync Success" "Backup completed"
else
    echo "$(date): Sync failed!" >> $LOGFILE
    /usr/local/bin/send-alert.sh "Cloud Sync Failed" "Check logs"
fi
```

**Cron Job (daily at 2 AM):**
```bash
sudo crontab -e

# Add:
0 2 * * * /usr/local/bin/cloud-sync.sh
```

## Monitoring & Alerts

### Alert Rules (`/etc/prometheus/alert_rules.yml`)

```yaml
groups:
  - name: system_alerts
    interval: 30s
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"

      - alert: LowDiskSpace
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk space below 10%"

      - alert: HighMemoryUsage
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Memory usage above 90%"

      - alert: ServiceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
```

### Grafana Alert Notifications

**Configure Email Alerts:**
```yaml
# /etc/grafana/grafana.ini

[smtp]
enabled = true
host = smtp.gmail.com:587
user = your-email@gmail.com
password = app-password
from_address = grafana@homeserver
from_name = Grafana Home Server
```

## Maintenance Scripts

### Daily Health Check (`/usr/local/bin/health-check.sh`)

```bash
#!/bin/bash
# Daily system health check

REPORT="/tmp/health-report.txt"

echo "Home Server Health Report - $(date)" > $REPORT
echo "========================================" >> $REPORT
echo "" >> $REPORT

# Uptime
echo "Uptime:" >> $REPORT
uptime >> $REPORT
echo "" >> $REPORT

# Disk usage
echo "Disk Usage:" >> $REPORT
df -h / /srv >> $REPORT
echo "" >> $REPORT

# Memory
echo "Memory:" >> $REPORT
free -h >> $REPORT
echo "" >> $REPORT

# CPU temp
echo "CPU Temperature:" >> $REPORT
sensors | grep "Core" >> $REPORT
echo "" >> $REPORT

# Services status
echo "Service Status:" >> $REPORT
systemctl is-active smbd >> $REPORT
systemctl is-active prometheus >> $REPORT
systemctl is-active grafana-server >> $REPORT

# Send email
cat $REPORT | mail -s "Daily Health Report" admin@example.com
```

### Backup Script

```bash
#!/bin/bash
# Backup important configs

BACKUP_DIR="/srv/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup configs
cp /etc/samba/smb.conf $BACKUP_DIR/
cp /etc/prometheus/prometheus.yml $BACKUP_DIR/
cp /etc/grafana/grafana.ini $BACKUP_DIR/

tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR
rm -rf $BACKUP_DIR

echo "Backup completed: $BACKUP_DIR.tar.gz"
```

## Results & Benefits

### Cost Savings

| Item | Commercial Solution | This Project | Savings |
|------|-------------------|--------------|---------|
| NAS Device | $500 | $0 (recycled) | $500 |
| Cloud Storage (1TB) | $120/year | $0 (Google Drive free) | $120/year |
| VPN Service | $60/year | $0 (Tailscale free) | $60/year |
| Monitoring Tool | $50/month | $0 (open source) | $600/year |
| **Total Annual** | **$830** | **$30** (electricity) | **$800** |

### Performance Metrics

- **Power Consumption**: 12-18W (vs. 30-50W for NAS)
- **Uptime**: 99.8% over 6 months
- **File Transfer**: 110 MB/s over LAN
- **Remote Access**: <100ms latency via Tailscale
- **Storage**: 500GB (expandable via USB)

### Use Cases

1. **Personal Cloud Storage**
   - Photos/videos backup
   - Document synchronization
   - Media streaming (via Plex/Jellyfin)

2. **Development Environment**
   - Git server
   - Docker containers
   - Testing environment

3. **Home Automation**
   - Home Assistant integration
   - IoT device monitoring
   - Smart home hub

4. **Learning Platform**
   - Practice Linux administration
   - Learn networking concepts
   - Experiment with services

## Lessons Learned

### Challenges Overcome

1. **Laptop Overheating**
   - Solution: Removed battery, improved ventilation, configured fan control

2. **WiFi Dropout**
   - Solution: Switched to Ethernet connection, more stable

3. **Power Outages**
   - Solution: Added UPS, configured automatic shutdown

4. **Remote Access Complexity**
   - Solution: Tailscale eliminated port forwarding needs

### Best Practices

- Use static IP assignment for server
- Regular automated backups
- Monitor disk health with SMART
- Document all configurations
- Test restore procedures
- Keep services updated

## Future Enhancements

- [ ] Add Nextcloud for full cloud replacement
- [ ] Implement automated OS updates
- [ ] Add Pi-hole for network-wide ad blocking
- [ ] Set up Docker containers for services
- [ ] Add external USB drive for increased storage
- [ ] Implement RAID for data redundancy
- [ ] Create automated failover system
- [ ] Add home automation integration (Home Assistant)
